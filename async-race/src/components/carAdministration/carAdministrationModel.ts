import { CarsInterface, DataService } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import CarAdministrationView from './carAdministrationView';
import carName from '../../assets/data/carName.json';
import makeRequest from '../appController/data-service';

const CARS_PER_GENERATION = 100;
const MAX_RANDOM_COLOR = 360;

class CarAdministrationModel {
  private carAdministrationView: CarAdministrationView;

  protected emitter: EventEmitter<CarsInterface>;

  private SERVER_URL: string;

  private carName: { brand: string[]; model: string[] }[];

  private makeRequest: <T>(
    url: string,
    method: string,
    data?: DataService | undefined,
  ) => Promise<{ data: T; header: string | null }>;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.makeRequest = makeRequest;
    this.SERVER_URL = SERVER_URL;
    this.carName = carName;
    this.carAdministrationView = new CarAdministrationView(main);
    this.processDatalistElement();
    this.emitter.subscribe('winnerBtnClick', this.carAdministrationView.hideBlockCarAdministration);
    this.emitter.subscribe('garageBtnClick', this.carAdministrationView.visibleBlockCarAdministration);
    this.emitter.subscribe('updateDatalist', async () => {
      const dataCar = await this.loadCars();
      this.carAdministrationView.addDatalistName(dataCar);
    });
  }

  private async loadCars(): Promise<CarsInterface[]> {
    try {
      const url = `${this.SERVER_URL}/garage`;
      const carsData = await this.makeRequest<CarsInterface[]>(url, 'GET');
      return carsData.data;
    } catch (error) {
      throw new Error(`Server connection error. Status: ${error}`);
    }
  }

  protected async processBtnCreate(): Promise<void> {
    const input = document.querySelector('.cars-create__input') as HTMLInputElement;
    const color = document.querySelector('.cars-create__color') as HTMLInputElement;
    const data = {
      name: input.value,
      color: color.value,
    };
    await this.addCars([data]);
    input.value = '';
  }

  protected async addCars(dataCars: { name: string; color: string }[]): Promise<void> {
    try {
      const url = `${this.SERVER_URL}/garage`;
      const carPromises = dataCars.map(async (data) => {
        const createdCar = await this.makeRequest<CarsInterface>(url, 'POST', data);
        this.emitter.emit('createdCar', createdCar.data);
        this.emitter.emit('updateDatalist', createdCar.data);
      });
      await Promise.all(carPromises);
    } catch {
      console.error('Server connection error. Run server.');
    }
  }

  protected async requestCarUpdate(dataCar: CarsInterface): Promise<CarsInterface> {
    try {
      const url = `${this.SERVER_URL}/garage/${dataCar.id}`;
      const updateCar = await this.makeRequest<CarsInterface>(url, 'PUT', {
        name: dataCar.name,
        color: dataCar.color,
      });
      return updateCar.data;
    } catch (error) {
      throw new Error(`Server connection error. Status: ${error}`);
    }
  }

  protected processBtnGenerateCar(): void {
    const dataCars = [];
    for (let i = 0; i < CARS_PER_GENERATION; i += 1) {
      const data = {
        name: this.generateRandomName(),
        color: this.generateRandomColor(),
      };
      dataCars.push(data);
    }
    this.addCars(dataCars);
  }

  private generateRandomColor(): string {
    const hue = Math.floor(Math.random() * MAX_RANDOM_COLOR);
    const colorRandom = `hsla(${hue}, 100%, 50%, 1)`;
    return colorRandom;
  }

  private generateRandomName(): string {
    const { brand, model } = this.carName[0];
    const randomIndexBrend = Math.floor(Math.random() * brand.length);
    const randomIndexModel = Math.floor(Math.random() * model.length);
    const randomName = `${brand[randomIndexBrend]} ${model[randomIndexModel]}`;
    return randomName;
  }

  private async processDatalistElement(): Promise<void> {
    try {
      const carsData = await this.loadCars();
      this.carAdministrationView.addDatalistName(carsData);
    } catch {
      console.error('Server connection error. Run server.');
    }
  }

  protected addActiveInput(name: string): void {
    const input = document.querySelector('.cars-update__input') as HTMLInputElement;
    if (input) {
      input.value = name;
      input.removeAttribute('disabled');
    }
  }

  protected async applyCarUpdate(carId: number): Promise<void> {
    const inputUpdate = document.querySelector('.cars-update__input') as HTMLInputElement;
    const color = document.querySelector('.cars-update__color') as HTMLInputElement;
    const updateDataCar = {
      id: carId,
      name: inputUpdate.value,
      color: color.value,
    };
    const updateCar = await this.requestCarUpdate(updateDataCar);
    this.carAdministrationView.disabledInput();
    this.emitter.emit('updateCar', updateCar);
  }
}

export default CarAdministrationModel;
