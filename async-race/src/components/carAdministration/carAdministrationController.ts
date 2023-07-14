import EventEmitter from '../appController/EventEmitter';
import CarAdministrationModel from './carAdministrationModel';

class CarAdministrationController extends CarAdministrationModel {
  constructor(emitter: EventEmitter<unknown>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickCarsCreate();
  }

  private addListenerClickCarsCreate(): void {
    document.querySelector('.cars-create__button')?.addEventListener('click', () => {
      this.addCarServer();
    });
  }
}

export default CarAdministrationController;
