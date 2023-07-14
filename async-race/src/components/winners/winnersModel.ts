import EventEmitter from '../appController/EventEmitter';
import WinnersView from './winnersView';

class WinnersModel {
  private winnersView: WinnersView;

  protected emitter: EventEmitter<unknown>;

  private SERVER_URL: string;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.SERVER_URL = SERVER_URL;
    this.winnersView = new WinnersView(emitter, main);

    this.emitter.subscribe('winnerBtnClick', () => this.winnersView.visibleBlockWinners());
    this.emitter.subscribe('garageBtnClick', () => this.winnersView.hideBlockWinners());
  }
}

export default WinnersModel;
