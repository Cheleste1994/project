interface IEverything {
  status: 'ok' | 'error';
  totalResults: number;
  articles: IEverythingItem[];
}

interface IEverythingItem extends IEverything {
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

interface ISource extends ISources {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export { IEverything, IEverythingItem, ISources, ISource };
