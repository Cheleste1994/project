import { CarsInterface, WinnersInterface } from '../../assets/data/interface';
import EventEmitter from '../appController/EventEmitter';
import { addBtn, addDiv, addHTMLElement } from '../appController/helpers';
import './winners.css';

enum TableHeaders {
  Number = 'header-table__number',
  ID = 'header-table__car-id',
  Car = 'header-table__car',
  Name = 'header-table__name',
  Win = 'header-table__win',
  'Best Time (seconds)' = 'header-table__time',
}

class WinnersView {
  public emitter: EventEmitter<CarsInterface>;

  private addBtn: (
    element: HTMLElement,
    className: string,
    text: string,
    attributes: { [key: string]: string }[],
  ) => HTMLElement;

  private addHTMLElement: (elementName: string, className: string, text: string) => HTMLElement;

  private addDiv: (element: HTMLElement, className: string) => HTMLElement;

  constructor(emitter: EventEmitter<CarsInterface>, main: HTMLElement) {
    this.emitter = emitter;
    this.addHTMLElement = addHTMLElement;
    this.addBtn = addBtn;
    this.addDiv = addDiv;
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
    if (addPagination.lastChild) {
      const attribute = [{ type: 'button' }];
      this.addBtn(addPagination.lastChild as HTMLElement, 'winners-pagination__prev', 'Previous', attribute);
      this.addBtn(addPagination.lastChild as HTMLElement, 'winners-pagination__next', 'Next', attribute);
    }

    main.appendChild(winnersBlock);
    return main;
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

  public fillBodyTableWinners(
    cars: WinnersInterface[],
    requestFromCar: (arg0: number) => Promise<CarsInterface>,
    firstNumberCar: number,
  ): void {
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < cars.length; index += 1) {
      const row = document.createElement('tr');
      const cellPromises = Object.keys(TableHeaders).map((key) =>
        this.createCellElement(key, cars[index], requestFromCar, firstNumberCar + index),
      );

      Promise.all(cellPromises).then((cells) => {
        cells.forEach((cell) => row.appendChild(cell));
      });

      fragment.appendChild(row);
    }
    const tableBody = document.querySelector('.body-table');
    if (tableBody) {
      tableBody.innerHTML = '';
      tableBody.appendChild(fragment);
    }
  }

  private async createCellElement(
    key: string,
    car: WinnersInterface,
    requestFromCar: (arg0: number) => Promise<CarsInterface>,
    numberCar: number,
  ): Promise<HTMLElement> {
    const carData = await requestFromCar(car.id);
    const cell = document.createElement('td');
    switch (key) {
      case 'Number':
        cell.innerText = `${numberCar}`;
        break;
      case 'ID':
        cell.innerText = `${car.id}`;
        break;
      case 'Car':
        await this.addIconWinners(cell, carData.color, car.id);
        break;
      case 'Win':
        cell.innerText = `${car.wins}`;
        break;
      case 'Name':
        cell.innerText = carData.name;
        break;
      case 'Best Time (seconds)':
        cell.innerText = `${car.time}`;
        break;
      default:
        break;
    }
    return cell;
  }

  public addTitleWinners(num: number): void {
    const title = document.querySelector('.winners-title__cars');
    if (title) {
      title.innerHTML = `(${num})`;
    }
  }

  public changePage(pageNumber: number): void {
    const pageH3 = document.querySelector('.winners-page__number');
    if (pageH3) {
      pageH3.innerHTML = `Page #${pageNumber}`;
    }
  }

  public async addIconWinners(fieldRace: HTMLElement, color: string, carId: number): Promise<HTMLElement> {
    const icon = document.createElement('span');
    icon.classList.add(`winners__id=${carId}`);

    try {
      const response = await fetch('./icons/car.svg');
      const svgContent = await response.text();
      icon.innerHTML = svgContent;

      const svg = icon.querySelector('svg');
      if (svg) {
        svg.style.fill = color;
        svg.style.width = '50px';
        svg.style.height = '20px';
      }

      fieldRace.appendChild(icon);
    } catch (error) {
      console.error('Not icon', error);
    }

    return fieldRace;
  }
}

export default WinnersView;
