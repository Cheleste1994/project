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
    this.addFirstPage();
    this.emitter.subscribe('winnerBtnClick', () => this.racingView.hideBlocGarage());
    this.emitter.subscribe('garageBtnClick', () => this.racingView.visibleBlocGarage());
    this.emitter.subscribe('createdCar', (data) => this.addCarOnPage([data]));
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

  protected async removeCarServer(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.SERVER_URL}/garage/${id}`, {
        method: 'DELETE',
      });
      console.log(response);

      if (response.status === 200) {
        return response.ok;
      }
      console.error(`Failed to remove car: ${response.status}`);
      return response.ok;
    } catch (error) {
      throw new Error('Server connection error');
    }
  }

  private async addFirstPage(): Promise<void> {
    const carsData = await this.loadCarsFromServer();
    const checkLengthCars = carsData.length > MAX_CARS_PER_PAGE ? MAX_CARS_PER_PAGE : carsData.length;
    this.racingView.generateRaceField(carsData, 0, checkLengthCars);
    this.racingView.changeQuantityCar(carsData);
    this.emitter.emit('pageLoad');
  }

  private async addCarOnPage(data: CarsInterface[]): Promise<void> {
    const carsData = await this.loadCarsFromServer();
    const carsPage = document.querySelectorAll('.cars');
    if (carsPage.length < MAX_CARS_PER_PAGE) {
      this.racingView.generateRaceField(data);
      this.emitter.emit('pageLoad');
    } else {
      this.racingView.changeQuantityCar(carsData);
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
    this.emitter.emit('pageLoad');
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
    this.emitter.emit('pageLoad');
  }

  protected async processBtnRemove(btnIndex: number): Promise<void> {
    const carsPage = document.querySelectorAll('.cars');
    const idCar = carsPage[btnIndex].className.split('-')[1];
    const isRemove = await this.removeCarServer(idCar);
    if (isRemove) {
      const carsData = await this.loadCarsFromServer();
      const pageNumber = this.searchNumberPage();
      this.racingView.cleanPageRacing();
      const firstCar = pageNumber === 1 ? 0 : pageNumber * MAX_CARS_PER_PAGE;
      const lastCar = Math.min(carsData.length - firstCar, MAX_CARS_PER_PAGE);
      this.racingView.generateRaceField(carsData, firstCar, lastCar);
      this.emitter.emit('pageLoad');
    }
  }
}

export default RacingModel;
