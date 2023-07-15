import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import CarAdministrationView from './carAdministrationView';

class CarAdministrationModel {
  private carAdministrationView: CarAdministrationView;

  private emitter: EventEmitter<CarsInterface>;

  private SERVER_URL: string;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.SERVER_URL = SERVER_URL;
    this.carAdministrationView = new CarAdministrationView(main);
    this.emitter.subscribe('winnerBtnClick', () => this.carAdministrationView.hideBlockCarAdministration());
    this.emitter.subscribe('garageBtnClick', () => this.carAdministrationView.visibleBlockCarAdministration());
  }

  protected addCarServer(): void {
    const input = document.querySelector('.cars-create__input') as HTMLInputElement;
    const color = document.querySelector('.cars-create__color') as HTMLInputElement;
    if (input.value) {
      const data = {
        name: input.value,
        color: color.value,
      };
      this.addCarsServer(data);
      input.value = '';
    }
  }

  protected async addCarsServer(data: { name: string; color: string }): Promise<void> {
    try {
      const response = await fetch(`${this.SERVER_URL}/garage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        const createdCar = await response.json();
        this.emitter.emit('createdCar', createdCar);
      } else {
        throw new Error('Failed to create car:');
      }
    } catch (error) {
      throw new Error('Server connection error');
    }
  }
}

export default CarAdministrationModel;
