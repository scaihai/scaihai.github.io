import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Loader2, ExternalLink, RefreshCw, X } from "lucide-react";
import type { FeedItem, FeedResponse } from "../types";

interface FeedColumnProps {
  topic: string;
  onRemove: (topic: string) => void;
  refreshKey?: number;
  markAllReadTrigger?: number;
}

export function FeedColumn({ topic, onRemove, refreshKey = 0, markAllReadTrigger = 0 }: FeedColumnProps) {
  const [data, setData] = useState<FeedResponse | null>(null);
  const [readLinks, setReadLinks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`news-hub-read-${topic}`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error("Failed to parse read topics", e); }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(`news-hub-read-${topic}`, JSON.stringify(readLinks));
  }, [readLinks, topic]);

  useEffect(() => {
    if (markAllReadTrigger > 0 && data?.items) {
      const newLinks = data.items.map(i => i.link);
      setReadLinks(prev => {
        const combined = Array.from(new Set([...newLinks, ...prev]));
        return combined.slice(0, 100);
      });
    }
  }, [markAllReadTrigger, data]);

  const handleMarkRead = (link: string) => {
    setReadLinks(prev => {
      if (prev.includes(link)) return prev;
      return [link, ...prev].slice(0, 100);
    });
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!showConfirm) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowConfirm(false);
      } else if (e.key === "Enter") {
        onRemove(topic);
        setShowConfirm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConfirm, topic, onRemove]);

  const fetchFeed = async () => {
    setLoading(true);
    setError("");
    try {
      let fetchedSuccessfully = false;
      let jsonData: FeedResponse | null = null;

      // Only attempt local API if not on GitHub Pages
      if (!window.location.hostname.includes("github.io")) {
        try {
          const res = await fetch(`/api/feed?topic=${encodeURIComponent(topic)}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.items) {
              jsonData = data;
              fetchedSuccessfully = true;
            }
          }
        } catch (e) {
          console.warn("Local API failed, falling back to CORS proxy", e);
        }
      }

      if (fetchedSuccessfully && jsonData) {
        setData(jsonData);
      } else {
        // Fallback to rss2json API
        const encodedTopic = encodeURIComponent(topic);
        const feedUrl = `https://news.google.com/rss/search?q=${encodedTopic}&hl=en-US&gl=US&ceid=US:en`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
        
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to load feed");
        }
        const json = await res.json();
        if (json.status !== "ok") {
          throw new Error(json.message || "Failed to parse feed");
        }
        
        const items = (json.items || []).map((item: any) => ({
          title: item.title || "",
          link: item.link || "",
          pubDate: item.pubDate || "",
          content: item.description || "",
          source: item.author || "Google News",
        })).sort((a: any, b: any) => {
          const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
          const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
          return dateB - dateA;
        });

        setData({
          title: topic,
          description: `Google News RSS search for ${topic}`,
          items,
        });
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [topic, refreshKey]);

  return (
    <div className="flex flex-col h-full bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 overflow-hidden shrink-0 w-[85vw] sm:w-[350px] lg:w-auto lg:flex-1 lg:min-w-0 snap-center relative">
      {/* Confirmation Dialog Overlay */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <h3 className="text-lg font-semibold text-white">Unfollow Topic</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Are you sure you want to unfollow <span className="text-blue-400 font-medium">"{topic}"</span>?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRemove(topic);
                  setShowConfirm(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-sm"
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-white truncate" title={topic}>
          {topic}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchFeed}
            disabled={loading}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors disabled:opacity-50"
            title="Refresh feed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/30 rounded-md transition-colors"
            title="Remove topic"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950/50 no-scrollbar feed-column-scroll relative">
        {loading && !data ? (
          <div className="flex flex-col justify-center items-center h-48 space-y-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="text-sm text-neutral-500">Fetching latest news...</span>
          </div>
        ) : error ? (
          <div className="text-center p-4 bg-red-950/20 rounded-lg border border-red-900/50">
            <p className="text-sm text-red-400 mb-2">{error}</p>
            <button
              onClick={fetchFeed}
              className="text-xs font-medium bg-neutral-900 px-3 py-1.5 rounded-md border border-red-900/50 text-red-400 hover:bg-red-950/40"
            >
              Try Again
            </button>
          </div>
        ) : data && data.items.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-sm text-neutral-500">No articles found for "{topic}".</p>
          </div>
        ) : (
          data?.items.map((item, index) => (
            <NewsCard 
              key={`${item.link}-${index}`} 
              item={item} 
              index={index + 1} 
              total={data.items.length} 
              isUnread={!readLinks.includes(item.link)}
              onMarkRead={() => handleMarkRead(item.link)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function NewsCard({ item, index, total, isUnread, onMarkRead }: { item: FeedItem; index: number; total: number; isUnread: boolean; onMarkRead: () => void }) {
  // Extract just the publication name if the source is attached
  let sourceName = item.source;
  
  // Clean up title if it contains the source name at the end (Google News does this sometimes)
  let cleanTitle = item.title;
  const titleParts = cleanTitle.split(" - ");
  if (titleParts.length > 1) {
    const possibleSource = titleParts.pop();
    if (possibleSource) {
      sourceName = possibleSource;
      cleanTitle = titleParts.join(" - ");
    }
  }

  // Format date safely
  let timeAgo = "";
  try {
    if (item.pubDate) {
      timeAgo = formatDistanceToNow(new Date(item.pubDate), { addSuffix: true });
      timeAgo = timeAgo.replace('about ', '').replace('less than a minute ago', 'just now');
    }
  } catch (e) {
    timeAgo = item.pubDate; // Fallback to raw string if parsing fails
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onMarkRead}
      className={`block group rounded-lg p-4 transition-all duration-200 cursor-pointer relative ${
        isUnread
          ? "bg-neutral-900 border border-blue-500/50 hover:border-blue-400 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)]"
          : "bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 opacity-95 hover:opacity-100"
      }`}
    >
      {isUnread && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      )}
      <div className="flex flex-col gap-2">
        <h3 className={`font-medium leading-snug transition-colors ${
          isUnread ? "text-white group-hover:text-blue-400" : "text-neutral-300 group-hover:text-white"
        }`}>
          {cleanTitle}
        </h3>
        
        <div className={`flex items-center mt-2 pt-3 gap-2 text-xs border-t w-full overflow-hidden transition-colors ${
          isUnread ? "border-neutral-800 text-neutral-400" : "border-neutral-800/60 text-neutral-400/80"
        }`}>
          <span className={`font-semibold truncate min-w-0 flex-1 ${isUnread ? "text-neutral-300" : "text-neutral-400"}`}>
            {sourceName}
          </span>
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isUnread ? "bg-neutral-800 text-neutral-300" : "bg-neutral-900/50 text-neutral-400"
            }`}>
              {index}/{total}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0"></span>
            <span className="whitespace-nowrap shrink-0 text-[11px]">{timeAgo}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
