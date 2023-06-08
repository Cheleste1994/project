import News from './news/news';
import Sources from './sources/sources';

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

export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: IEverything): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: ISources): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
