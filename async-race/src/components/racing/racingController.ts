import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingModel from './racingModel';

class RacingController extends RacingModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickGarage();
    this.addListenerClickNextBtn();
    this.addListenerClickPrevBtn();
  }

  private addListenerClickGarage(): void {
    document.querySelector('.garage__btn')?.addEventListener('click', () => {
      this.emitter.emit('garageBtnClick');
    });
  }

  private addListenerClickNextBtn(): void {
    document.querySelector('.pagination__next')?.addEventListener('click', () => {
      this.addNextPage();
    });
  }

  private addListenerClickPrevBtn(): void {
    document.querySelector('.pagination__prev')?.addEventListener('click', () => {
      this.addPrevPage();
    });
  }
}

export default RacingController;
