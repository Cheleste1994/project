import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingModel from './racingModel';

class RacingController extends RacingModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickGarage();
    this.addListenerClickNextBtn();
    this.addListenerClickPrevBtn();
    this.emitter.subscribe('pageLoad', () => {
      this.addListenerClickBtnRemove();
      this.addListenerClickBtnSelect();
    });
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

  private addListenerClickBtnRemove(): void {
    const btnsRemove = document.querySelectorAll('.car__btn-remove');
    btnsRemove?.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.processBtnRemove(index);
      });
    });
  }

  private addListenerClickBtnSelect(): void {
    const btnsSelect = document.querySelectorAll('.car__btn-select');
    btnsSelect?.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.processBtnSelect(index);
      });
    });
  }
}

export default RacingController;
