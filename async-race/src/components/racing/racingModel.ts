import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingController from './racingController';
import RacingView from './racingView';

class RacingModel {
  private racingView: RacingView;

  private racingController: RacingController;

  private emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement) {
    this.emitter = emitter;
    this.racingView = new RacingView(main);
    this.racingController = new RacingController(emitter);
    this.loadCarsFromServer();
    this.emitter.subscribe('winnerBtnClick', () => this.racingView.hideBlocGarage());
    this.emitter.subscribe('garageBtnClick', () => this.racingView.visibleBlocGarage());
  }

  private async loadCarsFromServer(): Promise<void> {
    const response = await fetch('http://127.0.0.1:3000/garage');
    if (response.ok) {
      const cars = (await response.json()) as CarsInterface[];
      this.racingView.createStartFieldRace(cars);
    } else {
      console.error('Failed to fetch cars:', response.status);
    }
  }
}

export default RacingModel;
