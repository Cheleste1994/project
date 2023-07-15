import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import CarAdministrationView from './carAdministrationView';
import carName from '../../assets/data/carName.json';

const CARS_PER_GENERATION = 100;
const MAX_RANDOM_COLOR = 360;

class CarAdministrationModel {
  private carAdministrationView: CarAdministrationView;

  protected emitter: EventEmitter<CarsInterface>;

  private SERVER_URL: string;

  private carName: { brand: string[]; model: string[] }[];

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.SERVER_URL = SERVER_URL;
    this.carName = carName;
    this.carAdministrationView = new CarAdministrationView(main);
    this.processDatalistElement();
    this.emitter.subscribe('winnerBtnClick', () => this.carAdministrationView.hideBlockCarAdministration());
    this.emitter.subscribe('garageBtnClick', () => this.carAdministrationView.visibleBlockCarAdministration());
  }

  private async loadCarsFromServer(): Promise<CarsInterface[]> {
    try {
      const response = await fetch(`${this.SERVER_URL}/garage`);
      if (response.ok) {
        const carsData = (await response.json()) as CarsInterface[];
        return carsData;
      }
      throw new Error('Server connection error');
    } catch (error) {
      throw new Error('Server connection error');
    }
  }

  protected processBtnCreate(): void {
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

  protected async updateCarServer(dataCar: CarsInterface): Promise<CarsInterface> {
    try {
      const data = {
        name: dataCar.name,
        color: dataCar.color,
      };
      const response = await fetch(`${this.SERVER_URL}/garage/${dataCar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const updateCar = await response.json();
        return updateCar;
      }
      throw new Error('Failed to update car.');
    } catch (error) {
      throw new Error('Server connection error');
    }
  }

  protected processBtnGenerateCar(): void {
    for (let i = 0; i < CARS_PER_GENERATION; i += 1) {
      const data = {
        name: this.generateRandomName(),
        color: this.generateRandomColor(),
      };
      this.addCarsServer(data);
    }
  }

  private generateRandomColor(): string {
    const hue = Math.floor(Math.random() * MAX_RANDOM_COLOR);
    const colorRandom = `hsla(${hue}, 100%, 50%, 1)`;
    return colorRandom;
  }

  private generateRandomName(): string {
    const { brand } = this.carName[0];
    const { model } = this.carName[0];
    const randomIndexBrend = Math.floor(Math.random() * brand.length);
    const randomIndexModel = Math.floor(Math.random() * model.length);
    const randomName = `${brand[randomIndexBrend]} ${model[randomIndexModel]}`;
    return randomName;
  }

  private async processDatalistElement(): Promise<void> {
    const carsData = await this.loadCarsFromServer();
    this.carAdministrationView.addDatalistName(carsData);
  }

  protected changeInputUpdate(dataCar: CarsInterface): () => CarsInterface {
    this.carAdministrationView.addActiveInputUpdate(dataCar.name);
    return () => {
      this.saveUpdateCarServer(dataCar);
      this.carAdministrationView.disabledInputUpdate();
      return dataCar;
    };
  }

  protected async saveUpdateCarServer(dataCar: CarsInterface): Promise<void> {
    const inputUpdate = document.querySelector('.cars-update__input') as HTMLInputElement;
    const color = document.querySelector('.cars-update__color') as HTMLInputElement;
    const updateDataCar = {
      id: dataCar.id,
      name: inputUpdate.value,
      color: color.value,
    };
    const updateCar = await this.updateCarServer(updateDataCar);
    this.emitter.emit('updateCar', updateCar);
  }
}

export default CarAdministrationModel;
