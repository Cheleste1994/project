import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingModel from './racingModel';

class RacingController extends RacingModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickGarage();
  }

  private addListenerClickGarage(): void {
    document.querySelector('.garage__btn')?.addEventListener('click', () => {
      this.emitter.emit('garageBtnClick');
    });
  }
}

export default RacingController;
