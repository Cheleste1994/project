import EventEmitter from '../appController/EventEmitter';
import WinnersController from './winnersController';
import WinnersView from './winnersView';

class WinnersModel {
  private winnersView: WinnersView;

  private winnersController: WinnersController;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement) {
    this.winnersView = new WinnersView(emitter, main);
    this.winnersController = new WinnersController(emitter);
  }
}

export default WinnersModel;
