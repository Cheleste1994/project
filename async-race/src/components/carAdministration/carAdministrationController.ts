import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import CarAdministrationModel from './carAdministrationModel';

class CarAdministrationController extends CarAdministrationModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickCarsCreate();
    this.addListenerClickGenerateCars();
    this.emitter.subscribe('clickBtnSelect', (data) => {
      this.addListenerClickBtnUpdate(data);
    });
    this.emitter.subscribe('pageLoad', () => {
      this.addListenerClickRace();
    });
  }

  private addListenerClickCarsCreate(): void {
    document.querySelector('.cars-create__button')?.addEventListener('click', () => {
      this.processBtnCreate();
    });
  }

  private addListenerClickGenerateCars(): void {
    document.querySelector('.cars-generate__btn-generate')?.addEventListener('click', () => {
      this.processBtnGenerateCar();
    });
  }

  private addListenerClickBtnUpdate(data: CarsInterface): void {
    const activeInput = this.changeInputUpdate(data);
    const btnUodate = document.querySelector('.cars-update__button') as HTMLElement;
    const event = (): void => {
      activeInput();
      btnUodate?.removeEventListener('click', event);
    };
    btnUodate?.addEventListener('click', event);
  }

  private addListenerClickRace(): void {
    document.querySelector('.cars-generate__btn-race')?.addEventListener('click', () => {
      this.emitter.emit('raceStart');
    });
  }
}

export default CarAdministrationController;
