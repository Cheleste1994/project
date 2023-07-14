import './app.css';
import EventEmitter from './EventEmitter';
import CarAdministrationController from '../carAdministration/carAdministrationController';
import RacingController from '../racing/racingController';
import WinnersController from '../winners/winnersController';

const SERVER_URL = 'http://127.0.0.1:3000';

class App {
  private carAdministrationController: CarAdministrationController;

  private racingController: RacingController;

  private emitter: EventEmitter<unknown>;

  private winnersController: WinnersController;

  constructor(main: HTMLElement) {
    this.emitter = new EventEmitter();
    this.carAdministrationController = new CarAdministrationController(this.emitter, main, SERVER_URL);
    this.racingController = new RacingController(this.emitter, main, SERVER_URL);
    this.winnersController = new WinnersController(this.emitter, main, SERVER_URL);
  }

  public start(): void {}
}

export default App;
