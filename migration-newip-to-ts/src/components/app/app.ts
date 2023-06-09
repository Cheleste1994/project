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
    const sources: ISources = await this.controller.getSources(undefined);
    this.view.drawSources(sources);

    const sourcesElement = document.querySelector('.sources') as HTMLElement;
    sourcesElement.addEventListener('click', async (e) => {
      const data = await this.controller.getNews(e);
      if (data) {
        this.view.drawNews(data);
      }
    });

    const sourcesOptions = document.querySelector('.menu') as HTMLElement;
    sourcesOptions.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      if (target.className === 'category' || target.className === 'language') {
        const sourcesTag = document.querySelector('.sources') as HTMLElement;
        sourcesTag.innerHTML = '';
        const loadOptions: ISources = await this.controller.getSources(e);
        this.view.drawSources(loadOptions);
      }
    });
  }
}

export default App;
