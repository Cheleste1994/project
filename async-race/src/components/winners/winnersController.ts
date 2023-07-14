import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import WinnersModel from './winnersModel';

class WinnersController extends WinnersModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickWinners();
  }

  private addListenerClickWinners(): void {
    document.querySelector('.winner__btn')?.addEventListener('click', () => {
      this.emitter.emit('winnerBtnClick');
    });
  }
}

export default WinnersController;
