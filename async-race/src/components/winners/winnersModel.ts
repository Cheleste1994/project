import EventEmitter from '../appController/EventEmitter';
import WinnersController from './winnersController';
import WinnersView from './winnersView';

class WinnersModel {
  private winnersView: WinnersView;

  private winnersController: WinnersController;

  private emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement) {
    this.emitter = emitter;
    this.winnersView = new WinnersView(emitter, main);
    this.winnersController = new WinnersController(emitter);

    this.emitter.subscribe('winnerBtnClick', () => this.winnersView.visibleBlockWinners());
    this.emitter.subscribe('garageBtnClick', () => this.winnersView.hideBlockWinners());
  }
}

export default WinnersModel;
