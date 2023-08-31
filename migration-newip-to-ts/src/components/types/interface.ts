interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsItem[];
  sources: SourceItem[];
}

interface NewsItem {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface SourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export { NewsResponse };
