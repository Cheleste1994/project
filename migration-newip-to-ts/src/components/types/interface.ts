interface IEverything {
  status: 'ok' | 'error';
  totalResults: number;
  articles: IEverythingItem[];
}

interface IEverythingItem {
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

interface ISources {
  status: 'ok' | 'error';
  sources: ISource[];
}

interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export { IEverything, ISources };
