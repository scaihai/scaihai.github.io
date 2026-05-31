import { useState, useEffect } from "react";
import { Plus, LayoutGrid, Radio, Clock, CheckCheck, ArrowUpCircle } from "lucide-react";
import { FeedColumn } from "./components/FeedColumn";

export default function App() {
  const [topics, setTopics] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("news-hub-topics");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse stored topics", e);
        }
      }
    }
    return [
      "Technology",
      "Science",
      "World News",
      "AI",
    ];
  });
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    localStorage.setItem("news-hub-topics", JSON.stringify(topics));
  }, [topics]);

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshKey, setRefreshKey] = useState(0);
  const [markAllReadTrigger, setMarkAllReadTrigger] = useState(0);

  // Auto-update every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
      setLastUpdated(new Date());
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTopic.trim();
    if (trimmed && !topics.map(t => t.toLowerCase()).includes(trimmed.toLowerCase())) {
      if (topics.length < 5) {
        setTopics((prev) => [...prev, trimmed]);
        setNewTopic("");
      }
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setTopics((prev) => prev.filter((t) => t !== topicToRemove));
  };

  const handleManualRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLastUpdated(new Date());
  };

  const isAtMaxTopics = topics.length >= 5;

  return (
    <div className="h-screen w-full bg-neutral-950 flex flex-col font-sans text-neutral-100 overflow-hidden">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-4 z-20 shadow-sm relative shrink-0">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 w-full xl:w-auto">
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-inner shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                News Hub
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">Multi-Column Aggregator</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-1 md:mt-0">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-400 bg-neutral-950 px-2 sm:px-3 py-1.5 rounded-full border border-neutral-800 shrink-0">
              <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span className="whitespace-nowrap">Updated: {lastUpdated.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <button
              onClick={() => setMarkAllReadTrigger(prev => prev + 1)}
              className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-blue-400 bg-blue-950/30 hover:bg-blue-900/50 rounded-full border border-blue-900/50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <CheckCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              Mark all read
            </button>
            <button
              onClick={() => {
                const containers = document.querySelectorAll('.feed-column-scroll');
                containers.forEach(container => {
                  container.scrollTo({ top: 0, behavior: 'smooth' });
                });
              }}
              className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <ArrowUpCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              Top
            </button>
          </div>
        </div>

        <form onSubmit={handleAddTopic} className="w-full xl:w-auto flex items-center gap-2 shrink-0">
          <div className="relative flex-1 xl:w-64">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              disabled={isAtMaxTopics}
              placeholder={isAtMaxTopics ? "Maximum 5 topics reached" : "Follow a new topic (e.g. Space)"}
              className="w-full pl-4 pr-10 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!newTopic.trim() || isAtMaxTopics}
              className="absolute right-1 top-1 bottom-1 px-2 text-neutral-400 hover:text-blue-500 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>
      </header>

      {/* Main Content - Max 5 Columns fitting screen horizontally on desktop, scrolling horizontaly on mobile */}
      <main className="flex-1 overflow-hidden min-h-0 p-4 relative bg-neutral-950 flex flex-col">
        {topics.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 space-y-4">
            <LayoutGrid className="w-16 h-16 opacity-20" />
            <p className="text-lg font-medium text-neutral-400">No topics followed.</p>
            <p className="text-sm text-neutral-500">Use the search bar above to add a Google News topic.</p>
          </div>
        ) : (
          <div className="flex lg:grid gap-4 h-full items-stretch min-h-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar snap-x snap-mandatory lg:snap-none" 
               style={{ gridTemplateColumns: `repeat(${Math.min(topics.length, 5)}, minmax(0, 1fr))` }}>
            {topics.map((topic) => (
              <FeedColumn
                key={topic}
                topic={topic}
                onRemove={handleRemoveTopic}
                refreshKey={refreshKey}
                markAllReadTrigger={markAllReadTrigger}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Footer / Status bar (optional, keeps it grounded) */}
      <footer className="bg-neutral-900 border-t border-neutral-800 px-6 py-2 text-xs text-neutral-500 flex justify-between items-center z-20">
        <p>Powered by Google News RSS Feeds</p>
        <p>{topics.length} / 5 topics followed</p>
      </footer>
    </div>
  );
}
