import EventEmitter from '../appController/EventEmitter';
import CarAdministrationView from './carAdministrationView';

class CarAdministrationModel {
  private carAdministrationView: CarAdministrationView;

  private emitter: EventEmitter<unknown>;

  private SERVER_URL: string;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement, SERVER_URL: string) {
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
        this.emitter.emit('createCar', createdCar);
      } else {
        console.error('Failed to create car:', response.status);
      }
    } catch (error) {
      console.error('Error creating car:', error);
    }
  }
}

export default CarAdministrationModel;
