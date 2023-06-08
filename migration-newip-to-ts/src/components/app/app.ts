import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISources } from '../types/interface';

class App {
  private readonly controller: AppController;

  private readonly view: AppView;

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
