import { CarsInterface, WinnersInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import './winners.css';

enum TableHeaders {
  Number = 'header-table__number',
  ID = 'header-table__car-id',
  Car = 'header-table__car',
  Win = 'header-table__win',
  Name = 'header-table__name',
  'Best Time (seconds)' = 'header-table__time',
}

class WinnersView {
  public emitter: EventEmitter<CarsInterface>;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement) {
    this.emitter = emitter;
    this.createHTMLElementBlock(main);
  }

  public createHTMLElementBlock(main: HTMLElement): HTMLElement {
    const winnersBlock = document.createElement('div');
    winnersBlock.classList.add('winners');

    const addWinnersTitle = this.addDiv(winnersBlock, 'winners-title');
    const titleH2 = this.addHTMLElement('H2', 'winners-title__h2', 'Winners');
    const titleCars = this.addHTMLElement('H2', 'winners-title__cars', '(0)');
    addWinnersTitle.firstChild?.appendChild(titleH2);
    addWinnersTitle.firstChild?.appendChild(titleCars);

    const addWinnersPage = this.addDiv(addWinnersTitle, 'winners-page');
    const titleH3 = this.addHTMLElement('H3', 'winners-page__number', 'Page #1');
    addWinnersPage.lastChild?.appendChild(titleH3);

    const addBlockRacing = this.addDiv(winnersBlock, 'winners-list');
    const addPagination = this.addDiv(addBlockRacing, 'winners-pagination');
    const addPrevPagination = this.createBtn('winners-pagination__prev', 'Previous');
    const addNextPagination = this.createBtn('winners-pagination__next', 'Next');
    addPagination.lastChild?.appendChild(addPrevPagination);
    addPagination.lastChild?.appendChild(addNextPagination);

    main.appendChild(winnersBlock);
    return main;
  }

  private addDiv(divWinners: HTMLElement, className: string): HTMLElement {
    const divElement = document.createElement('div');
    divElement.classList.add(className);
    divWinners.appendChild(divElement);
    return divWinners;
  }

  private addHTMLElement(element: string, className: string, text: string): HTMLElement {
    const divElement = document.createElement(element);
    divElement.classList.add(className);
    divElement.innerText = text;
    return divElement;
  }

  private createBtn(className: string, text: string): HTMLElement {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add(className);
    btn.innerText = text;
    return btn;
  }

  public visibleBlockWinners(): void {
    const winners = document.querySelector('.winners');
    winners?.classList.add('winners_visible');
  }

  public hideBlockWinners(): void {
    const winners = document.querySelector('.winners');
    winners?.classList.remove('winners_visible');
  }

  public addTableWinners(): void {
    const fragment = document.createDocumentFragment();

    const thead = document.createElement('thead');
    thead.classList.add('header-table');
    const headerRow = document.createElement('tr');

    const headers = Object.entries(TableHeaders);
    headers.forEach(([key, value]) => {
      const th = this.addHTMLElement('th', value, key);
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    fragment.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.classList.add('body-table');

    fragment.appendChild(tbody);
    const table = document.createElement('table');
    table.appendChild(fragment);
    const winnersList = document.querySelector('.winners-list');
    winnersList?.appendChild(table);
  }

  public fillBodyTableWinners(cars: WinnersInterface[]): void {
    const tableBody = document.querySelector('.body-table');
    const fragment = document.createDocumentFragment();
    const headers = Object.keys(TableHeaders);

    for (let i = 0; i < cars.length; i += 1) {
      const row = document.createElement('tr');
      headers.forEach((key) => {
        const cell = document.createElement('td');
        switch (key) {
          case 'Number':
            cell.innerText = `${i + 1}`;
            break;
          case 'ID':
            cell.innerText = `${cars[i].id}`;
            break;
          case 'Car':
            cell.innerText = `img`;
            break;
          case 'Win':
            cell.innerText = `${cars[i].wins}`;
            break;
          case 'Name':
            cell.innerText = `name`;
            break;
          case 'Best Time (seconds)':
            cell.innerText = `${cars[i].time}`;
            break;
          default:
            break;
        }
        row.appendChild(cell);
      });

      fragment.appendChild(row);
    }
    tableBody?.appendChild(fragment);
  }

  public addTitleWinners(num: number): void {
    const title = document.querySelector('.winners-title__cars');
    if (title) {
      title.innerHTML = `(${num})`;
    }
  }
}

export default WinnersView;
