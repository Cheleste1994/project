import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingView from './racingView';

class RacingModel {
  private racingView: RacingView;

  protected emitter: EventEmitter<unknown>;

  private SERVER_URL: string;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.SERVER_URL = SERVER_URL;
    this.racingView = new RacingView(main);
    this.loadCarsFromServer();
    this.emitter.subscribe('winnerBtnClick', () => this.racingView.hideBlocGarage());
    this.emitter.subscribe('garageBtnClick', () => this.racingView.visibleBlocGarage());
  }

  private async loadCarsFromServer(): Promise<void> {
    try {
      const response = await fetch(`${this.SERVER_URL}/garage`);
      if (response.ok) {
        const cars = (await response.json()) as CarsInterface[];
        this.racingView.createStartFieldRace(cars);
        this.racingView.changeQuantityCar(cars);
      } else {
        console.error('Failed to fetch cars:', response.status);
      }
    } catch (error) {
      console.error('Server connection error');
    }
  }
}

export default RacingModel;
