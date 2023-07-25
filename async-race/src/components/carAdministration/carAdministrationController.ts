import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import CarAdministrationModel from './carAdministrationModel';

class CarAdministrationController extends CarAdministrationModel {
  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    super(emitter, main, SERVER_URL);
    this.addListenerClickCarsCreate();
    this.addListenerClickGenerateCars();
    this.addListenerClickRaceOrReset();
    this.emitter.subscribe('clickBtnSelect', (data) => {
      this.addListenerClickBtnUpdate(data);
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
    this.addActiveInput(data.name);
    document.querySelector('.cars-update__button')?.addEventListener('click', () => this.applyCarUpdate(data.id));
  }

  private addListenerClickRaceOrReset(): void {
    const btnRace = document.querySelector('.cars-generate__btn-race');
    const btnReset = document.querySelector('.cars-generate__btn-reset');

    btnRace?.addEventListener('click', () => {
      btnRace.setAttribute('disabled', '');
      this.emitter.emit('raceStart');
    });
    btnReset?.addEventListener('click', () => {
      if (btnRace) {
        btnRace.removeAttribute('disabled');
        this.emitter.emit('raceReset');
      }
    });
  }
}

export default CarAdministrationController;
