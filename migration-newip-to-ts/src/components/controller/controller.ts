import AppLoader from './appLoader';
import { IEverything, ISources } from '../types/interface';

class AppController extends AppLoader {
  public async getSources(e?: Event): Promise<ISources> {
    if (!e) {
      const getResp = await super.getResp({ endpoint: 'sources' });
      return getResp as ISources;
    }
    const target = e.target as HTMLElement;
    const getOptions = await super.getResp({ endpoint: 'sources', value: `${target.className}=${target.id}` });
    return getOptions as ISources;
  }

  // eslint-disable-next-line consistent-return
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
        const data = await super.getResp(obj);
        const everythingData: IEverything = data as IEverything;
        return everythingData;
      } catch (error) {
        return undefined;
      }
    }
  }
}

export default AppController;
