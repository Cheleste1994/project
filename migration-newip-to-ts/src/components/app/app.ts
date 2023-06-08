import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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

class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public async start(): Promise<void> {
    const sources: ISources = await this.controller.getSources();
    this.view.drawSources(sources);

    const sourcesElement = document.querySelector('.sources') as HTMLElement;
    sourcesElement.addEventListener('click', async (e) => {
      const data = await this.controller.getNews(e);
      if (data) {
        this.view.drawNews(data);
      }
    });
  }
}

export default App;
