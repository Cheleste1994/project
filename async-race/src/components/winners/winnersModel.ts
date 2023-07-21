import { CarsInterface, QueryParamsWinners, WinnersInterface, WinnersResponse } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import WinnersView from './winnersView';

const MAX_WINNERS_PER_PAGE = 10;

class WinnersModel {
  private winnersView: WinnersView;

  protected emitter: EventEmitter<CarsInterface>;

  private SERVER_URL: string;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement, SERVER_URL: string) {
    this.emitter = emitter;
    this.SERVER_URL = SERVER_URL;
    this.winnersView = new WinnersView(emitter, main);
    this.addWinnersOnPage();
    this.emitter.subscribe('winnerBtnClick', () => this.winnersView.visibleBlockWinners());
    this.emitter.subscribe('garageBtnClick', () => this.winnersView.hideBlockWinners());
    this.emitter.subscribe('createdWinner', () => this.updatePageWinner());
    this.emitter.subscribe('updateWinner', () => this.updatePageWinner());
    this.emitter.subscribe('updateCar', () => this.updatePageWinner());
    this.emitter.subscribe('carRemove', async (data) => {
      const isDelete = await this.deleteWinnerFromServer(data.id);
      if (isDelete) {
        this.updatePageWinner();
      }
    });
  }

  private async loadWinnersFromServer(queryParams: QueryParamsWinners = {}): Promise<WinnersResponse> {
    const baseUrl = `${this.SERVER_URL}/winners`;
    const params = new URLSearchParams();

    if (queryParams.page) {
      params.append('_page', String(queryParams.page));
    }
    if (queryParams.limit) {
      params.append('_limit', String(queryParams.limit));
    }
    if (queryParams.sort) {
      params.append('_sort', queryParams.sort);
    }
    if (queryParams.order) {
      params.append('_order', queryParams.order);
    }

    const url = `${baseUrl}${`?${params.toString()}` || ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const totalCountHeader = response.headers.get('X-Total-Count');
    const totalCount = totalCountHeader ? Number(totalCountHeader) : 0;
    const data: WinnersInterface[] = await response.json();

    return {
      data,
      totalCount,
    };
  }

  private async deleteWinnerFromServer(id: number): Promise<boolean> {
    const response = await fetch(`${this.SERVER_URL}/winners/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  protected async getCarServer(id: number): Promise<CarsInterface> {
    const response = await fetch(`${this.SERVER_URL}/garage/${id}`);
    if (response.status === 200) {
      const getCar = (await response.json()) as CarsInterface;
      return getCar;
    }
    throw new Error(`${response.status}`);
  }

  private addWinnersOnPage(): void {
    window.addEventListener('load', () => {
      this.winnersView.addTableWinners();
      this.addBodyTableWinners();
    });
  }

  protected async addBodyTableWinners(
    page = 1,
    sort: QueryParamsWinners['sort'] = 'id',
    order: QueryParamsWinners['order'] = 'ASC',
  ): Promise<void> {
    const queryParams: QueryParamsWinners = {
      page,
      limit: MAX_WINNERS_PER_PAGE,
      sort,
      order,
    };
    const requestFromCar = (id: number): Promise<CarsInterface> => this.getCarServer(id);
    const { data, totalCount } = await this.loadWinnersFromServer(queryParams);
    const firstNumberCar = page === 1 ? 1 : (page - 1) * MAX_WINNERS_PER_PAGE + 1;
    this.winnersView.fillBodyTableWinners(data, requestFromCar, firstNumberCar);
    this.winnersView.addTitleWinners(totalCount);
    this.winnersView.changePage(page);
  }

  private searchNumberPage(): number {
    const pageNumber = document.querySelector('.winners-page__number');
    const number = Number(pageNumber?.innerHTML.split('#').pop());
    return number;
  }

  private updatePageWinner(): void {
    const numberPage = this.searchNumberPage();
    this.addBodyTableWinners(numberPage);
  }

  private searchArrowSort(): QueryParamsWinners {
    const arrowUp = document.querySelector('.sort-arrow__up');
    const arrowDown = document.querySelector('.sort-arrow__down');
    const queryParams: QueryParamsWinners = {
      page: undefined,
      sort: undefined,
      order: undefined,
    };
    if (arrowUp?.innerHTML.includes('ID')) {
      queryParams.order = 'ASC';
      queryParams.sort = 'id';
      return queryParams;
    }
    if (arrowDown?.innerHTML.includes('ID')) {
      queryParams.order = 'DESC';
      queryParams.sort = 'id';
      return queryParams;
    }
    if (arrowUp?.innerHTML.includes('Win')) {
      queryParams.order = 'ASC';
      queryParams.sort = 'wins';
      return queryParams;
    }
    if (arrowDown?.innerHTML.includes('Win')) {
      queryParams.order = 'DESC';
      queryParams.sort = 'wins';
      return queryParams;
    }
    if (arrowUp?.innerHTML.includes('Time')) {
      queryParams.order = 'ASC';
      queryParams.sort = 'time';
      return queryParams;
    }
    if (arrowDown?.innerHTML.includes('Time')) {
      queryParams.order = 'DESC';
      queryParams.sort = 'time';
      return queryParams;
    }
    return queryParams;
  }

  protected async changePageClick(direction: string): Promise<void> {
    const pageNumber = this.searchNumberPage();
    const { totalCount } = await this.loadWinnersFromServer({ limit: MAX_WINNERS_PER_PAGE });
    const { sort, order } = this.searchArrowSort();
    if (direction === 'next') {
      if (Math.ceil(totalCount / MAX_WINNERS_PER_PAGE) > pageNumber) {
        this.addBodyTableWinners(pageNumber + 1, sort, order);
      }
      return;
    }
    if (pageNumber > 1) {
      this.searchArrowSort();
      this.addBodyTableWinners(pageNumber - 1, sort, order);
    }
  }

  private changeArrowSort(element: HTMLElement): void {
    const arrowUp = document.querySelectorAll('.sort-arrow__up');
    arrowUp?.forEach((arrow) => {
      if (arrow.innerHTML !== element.innerHTML) {
        arrow.classList.remove('sort-arrow__up');
      }
    });
    const arrowDown = document.querySelectorAll('.sort-arrow__down');
    arrowDown?.forEach((arrow) => {
      if (arrow.innerHTML !== element.innerHTML) {
        arrow.classList.remove('sort-arrow__down');
      }
    });
    if (element.classList.contains('sort-arrow__up')) {
      element.classList.add('sort-arrow__down');
      element.classList.remove('sort-arrow__up');
    } else {
      element.classList.add('sort-arrow__up');
      element.classList.remove('sort-arrow__down');
    }
  }

  protected addSortOnSumWins(element: HTMLElement): void {
    const numberPage = this.searchNumberPage();
    if (element.classList.contains('sort-arrow__up')) {
      this.changeArrowSort(element);
      this.addBodyTableWinners(numberPage, 'wins', 'DESC');
    } else {
      this.changeArrowSort(element);
      this.addBodyTableWinners(numberPage, 'wins', 'ASC');
    }
  }

  protected addSortOnTime(element: HTMLElement): void {
    const numberPage = this.searchNumberPage();
    if (element.classList.contains('sort-arrow__up')) {
      this.changeArrowSort(element);
      this.addBodyTableWinners(numberPage, 'time', 'DESC');
    } else {
      this.changeArrowSort(element);
      this.addBodyTableWinners(numberPage, 'time', 'ASC');
    }
  }

  protected addSortOnId(element: HTMLElement): void {
    const numberPage = this.searchNumberPage();
    if (element.classList.contains('sort-arrow__up')) {
      this.changeArrowSort(element);
      this.addBodyTableWinners(numberPage, 'id', 'DESC');
    } else {
      this.changeArrowSort(element);
      this.addBodyTableWinners(numberPage, 'id', 'ASC');
    }
  }
}

export default WinnersModel;
