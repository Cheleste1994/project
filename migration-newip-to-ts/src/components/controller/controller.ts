import AppLoader from './appLoader';

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

class AppController extends AppLoader {
  public async getSources(): Promise<ISources> {
    const getResp = await super.getResp({ endpoint: 'sources' });
    return getResp as ISources;
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
