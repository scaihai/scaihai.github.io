export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  source: string;
}

export interface FeedResponse {
  title: string;
  description: string;
  items: FeedItem[];
}
