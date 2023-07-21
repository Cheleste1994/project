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
    this.winnersView.fillBodyTableWinners(data, requestFromCar);
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

  protected async changePageClick(direction: string): Promise<void> {
    const pageNumber = this.searchNumberPage();
    const { totalCount } = await this.loadWinnersFromServer({ limit: MAX_WINNERS_PER_PAGE });
    if (direction === 'next') {
      if (Math.ceil(totalCount / MAX_WINNERS_PER_PAGE) > pageNumber) {
        this.addBodyTableWinners(pageNumber + 1);
      }
      return;
    }
    if (pageNumber > 1) {
      this.addBodyTableWinners(pageNumber - 1);
    }
  }

  protected addSortOnSumWins(element: HTMLElement): void {
    const numberPage = this.searchNumberPage();
    if (element.classList.contains('sort-arrow__up')) {
      element.classList.add('sort-arrow__down');
      element.classList.remove('sort-arrow__up');
      this.addBodyTableWinners(numberPage, 'wins', 'DESC');
    } else {
      element.classList.add('sort-arrow__up');
      element.classList.remove('sort-arrow__down');
      this.addBodyTableWinners(numberPage, 'wins', 'ASC');
    }
    console.log(element);
  }
}

export default WinnersModel;
