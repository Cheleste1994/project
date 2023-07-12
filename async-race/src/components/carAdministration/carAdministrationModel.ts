import EventEmitter from '../appController/EventEmitter';
import CarAdministrationController from './carAdministrationController';
import CarAdministrationView from './carAdministrationView';

class CarAdministrationModel {
  private carAdministrationView: CarAdministrationView;

  private carAdministrationController: CarAdministrationController;

  private emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement) {
    this.emitter = emitter;
    this.carAdministrationView = new CarAdministrationView(main);
    this.carAdministrationController = new CarAdministrationController();

    this.emitter.subscribe('winnerBtnClick', () => this.carAdministrationView.hideBlockCarAdministration());
    this.emitter.subscribe('garageBtnClick', () => this.carAdministrationView.visibleBlockCarAdministration());
  }
}

export default CarAdministrationModel;
