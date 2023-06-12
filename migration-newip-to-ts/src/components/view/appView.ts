import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse } from '../types/interface';

export class AppView {
  private readonly news: News;

  private readonly sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews<T extends NewsResponse>(data: T): void {
    const values = data?.articles || [];
    this.news.draw(values);
  }

  public drawSources<T extends NewsResponse>(data: T): void {
    const values = data?.sources || [];
    this.sources.draw(values);
  }
}

export default AppView;
