import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import WinnersModel from './winnersModel';

class WinnersController extends WinnersModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickWinners();
    this.addListenerClickNextBtn();
    this.addListenerClickPrevBtn();
    this.addListeners();
  }

  private addListeners(): void {
    window.addEventListener('load', () => {
      this.addListenerClickWinSort();
    });
  }

  private addListenerClickWinners(): void {
    document.querySelector('.winner__btn')?.addEventListener('click', () => {
      this.emitter.emit('winnerBtnClick');
    });
  }

  private addListenerClickNextBtn(): void {
    document.querySelector('.winners-pagination__next')?.addEventListener('click', () => {
      this.changePageClick('next');
    });
  }

  private addListenerClickPrevBtn(): void {
    document.querySelector('.winners-pagination__prev')?.addEventListener('click', () => {
      this.changePageClick('prev');
    });
  }

  private addListenerClickWinSort(): void {
    document.querySelector('.header-table__win')?.addEventListener('click', (event) => {
      const element = event.target as HTMLElement;
      this.addSortOnSumWins(element);
    });
  }
}

export default WinnersController;
