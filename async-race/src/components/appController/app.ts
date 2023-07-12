import './app.css';
import CarAdministrationModel from '../carAdministration/carAdministrationModel';
import RacingModel from '../racing/racingModel';
import EventEmitter from './EventEmitter';
import WinnersModel from '../winners/winnersModel';

class App {
  private carAdministrationModel: CarAdministrationModel;

  private racingModel: RacingModel;

  private emitter: EventEmitter<unknown>;

  private winnersModel: WinnersModel;

  constructor(main: HTMLElement) {
    this.emitter = new EventEmitter();
    this.carAdministrationModel = new CarAdministrationModel(this.emitter, main);
    this.racingModel = new RacingModel(this.emitter, main);
    this.winnersModel = new WinnersModel(this.emitter, main);
  }

  public start(): void {}
}

export default App;
