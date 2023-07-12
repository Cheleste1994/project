import EventEmitter from '../appController/EventEmitter';
import RacingController from './racingController';
import RacingView from './racingView';

class RacingModel {
  private racingView: RacingView;

  private racingController: RacingController;

  private emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement) {
    this.emitter = emitter;
    this.racingView = new RacingView(main);
    this.racingController = new RacingController(emitter);

    this.emitter.subscribe('winnerBtnClick', () => this.racingView.hideBlocGarage());
    this.emitter.subscribe('garageBtnClick', () => this.racingView.visibleBlocGarage());
  }
}

export default RacingModel;
