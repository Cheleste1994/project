import AppLoader from './appLoader';

class AppController extends AppLoader {
  public async getSources(): Promise<unknown> {
    const getResp = await super.getResp({ endpoint: 'sources' });
    return getResp;
  }

  public getNews(e: Event): Promise<unknown> {
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
    return obj.endpoint !== '' ? super.getResp(obj) : Promise.reject(new Error('Endpoint is empty'));
  }
}

export default AppController;
