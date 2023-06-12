import AppLoader from './appLoader';
import { IEverything, ISources } from '../types/interface';

class AppController extends AppLoader {
  public async getSources(e?: Event): Promise<ISources> {
    if (!e) {
      return this.getResp<ISources>({ endpoint: 'sources' });
    }
    const target = e.target as HTMLElement;
    return this.getResp<ISources>({ endpoint: 'sources', value: `${target.className}=${target.id}` });
  }

  public async getNews(e: Event): Promise<IEverything | undefined> {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;
    const obj = {
      endpoint: '',
      options: {
        sources: '',
      },
    };
    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
          newsContainer.setAttribute('data-source', sourceId);
          obj.endpoint = 'everything';
          obj.options.sources = sourceId;
        }
        break;
      }
      target = target.parentNode as HTMLElement;
    }
    if (obj.endpoint !== '') {
      try {
        return await this.getResp<IEverything>(obj);
      } catch (error) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}

export default AppController;
