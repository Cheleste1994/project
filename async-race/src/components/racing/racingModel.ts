import { CarsInterface, EngineInterface } from '../../assets/data/interface';
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
    this.emitter.subscribe('updateCar', (data) => this.racingView.updateCar(data));
    this.emitter.subscribe('raceStart', () => this.raceStart());
    this.emitter.subscribe('raceReset', () => this.raceReset());
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
      if (response.status === 200) {
        return response.ok;
      }
      console.error(`Failed to remove car: ${response.status}`);
      return response.ok;
    } catch (error) {
      throw new Error('Server connection error');
    }
  }

  protected async startOrStopEngine(id: string, status: string): Promise<EngineInterface> {
    const response = await fetch(`${this.SERVER_URL}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status}`);
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
      this.racingView.changeQuantityCar(carsData);
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

  private searchIdCar(indexCar: number): string {
    const carsPage = document.querySelectorAll('.cars');
    const idCar = carsPage[indexCar].className.split('-')[1];
    return idCar;
  }

  protected async processBtnRemove(btnIndex: number): Promise<void> {
    const idCar = this.searchIdCar(btnIndex);
    const isRemove = await this.removeCarServer(idCar);
    if (isRemove) {
      const carsData = await this.loadCarsFromServer();
      const pageNumber = this.searchNumberPage();
      this.racingView.cleanPageRacing();
      const firstCar = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_CARS_PER_PAGE;
      const lastCar = firstCar + Math.min(carsData.length - firstCar, MAX_CARS_PER_PAGE);
      this.racingView.generateRaceField(carsData, firstCar, lastCar);
      this.racingView.changeQuantityCar(carsData);
      this.emitter.emit('pageLoad');
    }
  }

  protected processBtnSelect(btnIndex: number): void {
    const idCar = this.searchIdCar(btnIndex);
    const carsName = document.querySelectorAll('.car__name');
    if (carsName[btnIndex]) {
      const dataCar = {
        id: Number(idCar),
        name: carsName[btnIndex].innerHTML,
        color: '',
      };
      this.emitter.emit('clickBtnSelect', dataCar);
    }
  }

  protected async driveStart(elemIndex: number[]): Promise<void> {
    const promises = elemIndex.map((element) => {
      const idCar = this.searchIdCar(element);
      return this.startOrStopEngine(idCar, 'started');
    });
    const dataCars = await Promise.all(promises);
    this.switchEngineDriveMode(elemIndex);
    for (let i = 0; i < dataCars.length; i += 1) {
      const carsRace = document.querySelectorAll('.cars');
      const carIcons = document.querySelectorAll('.car-icon');
      const positionRace = carsRace[elemIndex[i]].getBoundingClientRect();
      const positionCar = carIcons[elemIndex[i]].getBoundingClientRect();
      const marginLeftFieldRace = positionRace.left;
      const sizeFieldRace = positionRace.right - positionRace.left;
      const sizeFieldCar = positionCar.right - positionCar.left;
      const raceDistance = sizeFieldRace - sizeFieldCar - marginLeftFieldRace;
      const speed = (raceDistance / dataCars[i].velocity).toFixed(2);
      this.racingView.addAnimationStartDrive(carsRace[elemIndex[i]], raceDistance, speed);
    }
  }

  protected async switchEngineDriveMode(elemIndex: number[]): Promise<void> {
    elemIndex.map(async (index) => {
      try {
        const idCar = this.searchIdCar(index);
        await this.startOrStopEngine(idCar, 'drive');
      } catch (error) {
        const carsRace = document.querySelectorAll('.cars');
        const carIcons = document.querySelectorAll('.car-icon');
        const positionCar = carIcons[index].getBoundingClientRect();
        this.racingView.addAnimationStartDrive(carsRace[index], positionCar.left);
      }
    });
  }

  protected async driveStop(btnIndex: number): Promise<void> {
    const carsRace = document.querySelectorAll('.cars');
    const idCar = this.searchIdCar(btnIndex);
    await this.startOrStopEngine(idCar, 'stopped');
    this.racingView.addAnimationStopDrive(carsRace[btnIndex]);
  }

  private raceStart(): void {
    const carsRace = document.querySelectorAll('.cars');
    this.driveStart(Object.keys(carsRace).map(Number));
  }

  private raceReset(): void {
    const carsRace = document.querySelectorAll('.cars');
    carsRace.forEach((car, index) => this.driveStop(index));
  }
}

export default RacingModel;
