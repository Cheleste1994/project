import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  async start() {
    const sources = await this.controller.getSources()
    this.view.drawSources(sources);

    document
      .querySelector('.sources')
      .addEventListener('click', (e) => {
        this.controller.getNews(e)
          .then(data => this.view.drawNews(data))
          .catch(error => {});
      });
  }
}

export default App;
