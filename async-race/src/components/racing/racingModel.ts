import { CarsInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import RacingView from './racingView';

const MAX_CARS_PER_PAGE = 7;

class RacingModel {
  private racingView: RacingView;

  protected emitter: EventEmitter<CarsInterface>;

  private SERVER_URL: string;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.SERVER_URL = SERVER_URL;
    this.racingView = new RacingView(main);
    this.addCarsOnPage();
    this.emitter.subscribe('winnerBtnClick', () => this.racingView.hideBlocGarage());
    this.emitter.subscribe('garageBtnClick', () => this.racingView.visibleBlocGarage());
    this.emitter.subscribe('createdCar', (data) => this.addCarOnPage([data]));
  }

  private async loadCarsFromServer(): Promise<CarsInterface[]> {
    try {
      const response = await fetch(`${this.SERVER_URL}/garage`);
      if (response.ok) {
        const cars = (await response.json()) as CarsInterface[];
        return cars;
      }
      throw new Error('Failed to fetch cars:');
    } catch (error) {
      throw new Error('Server connection error');
    }
  }

  private async addCarsOnPage(): Promise<void> {
    const cars = await this.loadCarsFromServer();
    const checkLengthCars = cars.length > MAX_CARS_PER_PAGE ? MAX_CARS_PER_PAGE : cars.length;
    this.racingView.generateRaceField(cars, 0, checkLengthCars);
    this.racingView.changeQuantityCar(cars);
  }

  private async addCarOnPage(data: CarsInterface[]): Promise<void> {
    const cars = await this.loadCarsFromServer();
    if (cars.length < MAX_CARS_PER_PAGE) {
      this.racingView.generateRaceField(data);
    } else {
      this.racingView.changeQuantityCar(cars);
    }
  }

  private searchNumberPage(): number {
    const pageH3 = document.querySelector('.page-number__h3');
    const pageNumber = Number(pageH3?.innerHTML.split('#').pop());
    return pageNumber;
  }

  protected async addNextPage(): Promise<void> {
    const carsData = await this.loadCarsFromServer();
    const pageNumber = this.searchNumberPage();
    if (Math.ceil(carsData.length / MAX_CARS_PER_PAGE) <= pageNumber) {
      return;
    }
    this.racingView.cleanPageRacing();
    const firstCar = pageNumber * MAX_CARS_PER_PAGE;
    const lastCar = Math.min((pageNumber + 1) * MAX_CARS_PER_PAGE, carsData.length);
    this.racingView.generateRaceField(carsData, firstCar, lastCar);
    this.racingView.addNextPage(pageNumber + 1);
  }

  protected async addPrevPage(): Promise<void> {
    const carsData = await this.loadCarsFromServer();
    const pageNumber = this.searchNumberPage();
    if (pageNumber - 1 === 0) {
      return;
    }
    this.racingView.cleanPageRacing();
    const firstCar = (pageNumber - 2) * MAX_CARS_PER_PAGE;
    const lastCar = firstCar + MAX_CARS_PER_PAGE;
    this.racingView.generateRaceField(carsData, firstCar, lastCar);
    this.racingView.addNextPage(pageNumber - 1);
  }
}

export default RacingModel;
