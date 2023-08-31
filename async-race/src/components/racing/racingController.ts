import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingModel from './racingModel';

class RacingController extends RacingModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickGarage();
    this.addListenerClickNextBtn();
    this.addListenerClickPrevBtn();
    this.addListenerClickFinish();
    this.emitter.subscribe('pageLoad', () => {
      this.addListenerClickBtnRemove();
      this.addListenerClickBtnSelect();
      this.addListenerClickDriveStart();
      this.addListenerClickDriveStop();
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

  private addListenerClickFinish(): void {
    const finishElement = document.querySelector('.finish');
    finishElement?.addEventListener('click', () => {
      finishElement.classList.remove('finish_active');
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

  private addListenerClickDriveStart(): void {
    const btnsStart = document.querySelectorAll('.car__btn-start');
    btnsStart?.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.driveStart([index]);
      });
    });
  }

  private addListenerClickDriveStop(): void {
    const btnsStart = document.querySelectorAll('.car__btn-stop');
    btnsStart?.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.driveStop(index);
      });
    });
  }
}

export default RacingController;
