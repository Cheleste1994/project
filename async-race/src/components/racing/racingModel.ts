import {
  CarsInterface,
  CarsResponse,
  DataService,
  EngineInterface,
  QueryParamsWinners,
  WinnersInterface,
} from '../../assets/data/interface';
import makeRequest from '../appController/data-service';
import EventEmitter from '../appController/EventEmitter';
import RacingView from './racingView';

const MAX_CARS_PER_PAGE = 7;

class RacingModel {
  private racingView: RacingView;

  protected emitter: EventEmitter<CarsInterface>;

  private SERVER_URL: string;

  private makeRequest: <T>(
    url: string,
    method: string,
    data?: DataService | undefined,
  ) => Promise<{ data: T; header: string | null }>;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.makeRequest = makeRequest;
    this.SERVER_URL = SERVER_URL;
    this.racingView = new RacingView(main);
    this.addFirstPage();
    this.emitter.subscribe('winnerBtnClick', this.racingView.hideBlocGarage);
    this.emitter.subscribe('garageBtnClick', this.racingView.visibleBlocGarage);
    this.emitter.subscribe('createdCar', (data) => this.addCarOnPage([data]));
    this.emitter.subscribe('updateCar', (data) => this.racingView.updateCar(data));
    this.emitter.subscribe('raceStart', () => this.raceStart());
    this.emitter.subscribe('raceReset', () => this.raceReset());
  }

  private async loadCars(queryParams: QueryParamsWinners = {}): Promise<CarsResponse> {
    const baseUrl = `${this.SERVER_URL}/garage`;
    const params = new URLSearchParams();
    if (queryParams.page) {
      params.append('_page', String(queryParams.page));
    }
    if (queryParams.limit) {
      params.append('_limit', String(queryParams.limit));
    }
    const url = `${baseUrl}${`?${params.toString()}` || ''}`;
    try {
      const carsData = await this.makeRequest<CarsInterface[]>(url, 'GET');
      const totalCount = carsData.header ? Number(carsData.header) : 0;
      const { data } = carsData;
      return {
        data,
        totalCount,
      };
    } catch (error) {
      throw new Error(`Server connection error. Status: ${error}`);
    }
  }

  protected async removeCar(id: string): Promise<void> {
    try {
      const url = `${this.SERVER_URL}/garage/${id}`;
      await this.makeRequest(url, 'DELETE');
      const dataCar = { color: '', id: Number(id), name: '' };
      this.emitter.emit('carRemove', dataCar);
      this.emitter.emit('updateDatalist', dataCar);
    } catch (error) {
      throw new Error(`Server connection error. Status: ${error}`);
    }
  }

  protected async startOrStopEngine(id: string, status: string): Promise<EngineInterface> {
    const url = `${this.SERVER_URL}/engine?id=${id}&status=${status}`;
    const dataEngine = await this.makeRequest<EngineInterface>(url, 'PATCH');
    return dataEngine.data;
  }

  protected async getWinner(id: number): Promise<WinnersInterface> {
    try {
      const url = `${this.SERVER_URL}/winners/${id}`;
      const getCar = await this.makeRequest<WinnersInterface>(url, 'GET');
      return getCar.data;
    } catch (error) {
      throw new Error(`Server connection error. Status: ${error}`);
    }
  }

  protected async createdWinner(data: WinnersInterface): Promise<boolean> {
    try {
      const url = `${this.SERVER_URL}/winners/`;
      await this.makeRequest(url, 'POST', data);
      this.emitter.emit('createdWinner');
      return true;
    } catch {
      return false;
    }
  }

  protected async updateWinner(dataCar: WinnersInterface): Promise<void> {
    try {
      const url = `${this.SERVER_URL}/winners/${dataCar.id}`;
      await this.makeRequest(url, 'PUT', {
        wins: dataCar.wins,
        time: dataCar.time,
      });
      this.emitter.emit('updateWinner');
    } catch (error) {
      throw new Error(`Server connection error. Status: ${error}`);
    }
  }

  private async addFirstPage(): Promise<void> {
    try {
      const carsData = await this.loadCars({ page: 1, limit: MAX_CARS_PER_PAGE });
      this.racingView.generateRaceField(carsData.data, 0, carsData.data.length);
      this.racingView.changeQuantityCar(carsData.totalCount);
      this.emitter.emit('pageLoad');
    } catch {
      console.error('Server connection error. Run server.');
    }
  }

  private async addCarOnPage(data: CarsInterface[]): Promise<void> {
    try {
      const carsData = await this.loadCars({ limit: MAX_CARS_PER_PAGE });
      const carsPage = document.querySelectorAll('.cars');
      if (carsPage.length < MAX_CARS_PER_PAGE) {
        this.racingView.generateRaceField(data);
        this.racingView.changeQuantityCar(carsData.totalCount);
        this.emitter.emit('pageLoad');
      } else {
        this.racingView.changeQuantityCar(carsData.totalCount);
      }
    } catch {
      console.error('Server connection error. Run server.');
    }
  }

  private searchNumberPage(): number {
    const pageH3 = document.querySelector('.page-number__h3');
    const pageNumber = Number(pageH3?.innerHTML.split('#').pop());
    return pageNumber;
  }

  protected async addNextPage(): Promise<void> {
    const pageNumber = this.searchNumberPage();
    const carsData = await this.loadCars({ page: pageNumber + 1, limit: MAX_CARS_PER_PAGE });
    if (!carsData.data.length) {
      return;
    }
    this.racingView.cleanPageRacing();
    this.racingView.generateRaceField(carsData.data, 0, carsData.data.length);
    this.racingView.addNextPage(pageNumber + 1);
    this.emitter.emit('pageLoad');
  }

  protected async addPrevPage(): Promise<void> {
    const pageNumber = this.searchNumberPage();
    const carsData = await this.loadCars({ page: pageNumber - 1 || 1, limit: MAX_CARS_PER_PAGE });
    this.racingView.cleanPageRacing();
    this.racingView.generateRaceField(carsData.data, 0, carsData.data.length);
    this.racingView.addNextPage(pageNumber - 1 || 1);
    this.emitter.emit('pageLoad');
  }

  private searchIdCar(indexCar: number): string {
    const carsPage = document.querySelectorAll('.cars');
    const idCar = carsPage[indexCar].className.split('-')[1];
    return idCar;
  }

  protected async processBtnRemove(btnIndex: number, page = 0): Promise<void> {
    try {
      if (page === 0) {
        const idCar = this.searchIdCar(btnIndex);
        await this.removeCar(idCar);
      }
      const pageNumber = page === 0 ? this.searchNumberPage() : page - 1;
      const carsData = await this.loadCars({ page: pageNumber || 1, limit: MAX_CARS_PER_PAGE });
      if (!carsData.data.length && carsData.totalCount) {
        this.racingView.addNextPage(pageNumber - 1 || 1);
        this.processBtnRemove(btnIndex, pageNumber || 1);
        return;
      }
      this.racingView.cleanPageRacing();
      this.racingView.generateRaceField(carsData.data, 0, carsData.data.length);
      this.racingView.changeQuantityCar(carsData.totalCount);
      this.emitter.emit('pageLoad');
    } catch {
      console.error('Server connection error. Run server.');
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

  protected async driveStart(arrIndex: number[]): Promise<void> {
    const promises = arrIndex.map((element) => {
      const idCar = this.searchIdCar(element);
      return this.startOrStopEngine(idCar, 'started');
    });
    const dataCars = await Promise.all(promises);
    const addListenerTransition = this.addListenerTransition();
    this.switchEngineDriveMode(arrIndex);
    for (let i = 0; i < dataCars.length; i += 1) {
      const carsRace = document.querySelectorAll('.cars');
      const carIcons = document.querySelectorAll('.car-icon');
      const positionRace = carsRace[arrIndex[i]].getBoundingClientRect();
      const positionCar = carIcons[arrIndex[i]].getBoundingClientRect();
      const marginLeftFieldRace = positionRace.left;
      const sizeFieldRace = positionRace.right - positionRace.left;
      const sizeFieldCar = positionCar.right - positionCar.left;
      const raceDistance = sizeFieldRace - sizeFieldCar - marginLeftFieldRace;
      const speed = (raceDistance / dataCars[i].velocity).toFixed(2);
      this.racingView.addAnimationStartDrive(carsRace[arrIndex[i]], raceDistance, speed);
      if (dataCars.length > 1) {
        addListenerTransition(carIcons[arrIndex[i]], speed, arrIndex[i]);
      }
    }
  }

  private addListenerTransition(): (arg0: Element, arg1: string, arg2: number) => void {
    let isWin = false;
    return (carIcon: Element, speed: string, index: number) => {
      carIcon.addEventListener('transitionend', (event) => {
        const time = (event as TransitionEvent).elapsedTime;
        if (!isWin && time === Number(speed)) {
          this.proccesWinner(index, speed);
          isWin = true;
        }
      });
    };
  }

  private async proccesWinner(index: number, speed: string): Promise<void> {
    const carsRace = document.querySelectorAll('.cars');
    const carName = carsRace[index].querySelector('.car__name');
    const winsCar = {
      id: Number(this.searchIdCar(index)),
      wins: 1,
      time: Number(speed),
    };
    if (carName) {
      this.racingView.addAnimationFinishCar(winsCar, carName.innerHTML);
    }
    const isCreatedWinner = await this.createdWinner(winsCar);
    const dataCar = await this.getWinner(winsCar.id);
    if (!isCreatedWinner) {
      winsCar.wins += dataCar.wins;
      if (winsCar.time > dataCar.time) {
        winsCar.time = dataCar.time;
      }
      this.updateWinner(winsCar);
    }
  }

  protected async switchEngineDriveMode(elemIndex: number[]): Promise<void> {
    elemIndex.map(async (index) => {
      try {
        const idCar = this.searchIdCar(index);
        await this.startOrStopEngine(idCar, 'drive');
      } catch (error) {
        if (error instanceof Error) {
          const errorCode = error.message;
          if (errorCode === '500') {
            const carsRace = document.querySelectorAll('.cars');
            const carIcons = document.querySelectorAll('.car-icon');
            const positionCar = carIcons[index].getBoundingClientRect();
            const garage = document.querySelector('.garage');
            if (garage) {
              const stylesGarage = window.getComputedStyle(garage);
              if (positionCar.left === parseInt(stylesGarage.marginLeft, 10)) {
                await this.driveStop(index);
                return;
              }
            }
            this.racingView.addAnimationStartDrive(carsRace[index], positionCar.left);
          }
        }
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
