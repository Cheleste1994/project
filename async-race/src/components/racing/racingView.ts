import { CarsInterface } from '../../assets/data/interface';
import './racing.css';

class RacingView {
  constructor(main: HTMLElement) {
    this.createHTMLElementBlock(main);
  }

  public createHTMLElementBlock(main: HTMLElement): HTMLElement {
    const divGarage = document.createElement('div');
    divGarage.classList.add('garage');
    const addGarageTitle = this.addDiv(divGarage, 'garage-title');
    const titleH2 = this.addHTMLElement('H2', 'garage-title__h2', 'Garage');
    const titleCars = this.addHTMLElement('H2', 'garage-title__cars', '(0)');
    addGarageTitle.firstChild?.appendChild(titleH2);
    addGarageTitle.firstChild?.appendChild(titleCars);

    const addGaragePage = this.addDiv(addGarageTitle, 'page-number');
    const titleH3 = this.addHTMLElement('H3', 'page-number__h3', 'Page #1');
    addGaragePage.lastChild?.appendChild(titleH3);

    const addBlockRacing = this.addDiv(addGaragePage, 'racing');
    const addPagination = this.addDiv(addBlockRacing, 'pagination');
    const addPrevPagination = this.createBtn('pagination__prev', 'Previous');
    const addNextPagination = this.createBtn('pagination__next', 'Next');
    addPagination.lastChild?.appendChild(addPrevPagination);
    addPagination.lastChild?.appendChild(addNextPagination);

    main.appendChild(addPagination);
    return main;
  }

  private addDiv(divGarage: HTMLElement, className: string): HTMLElement {
    const divElement = document.createElement('div');
    divElement.classList.add(className);
    divGarage.appendChild(divElement);
    return divGarage;
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

  public hideBlocGarage(): void {
    const garage = document.querySelector('.garage');
    garage?.classList.add('garage_hide');
  }

  public visibleBlocGarage(): void {
    const garage = document.querySelector('.garage');
    garage?.classList.remove('garage_hide');
  }

  public createStartFieldRace(cars: CarsInterface[]): void {
    const racingElement = document.querySelector('.racing');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < cars.length; i += 1) {
      const addCar = document.createElement('div');
      addCar.className = `cars car-${cars[i].id}`;
      const addTitle = this.addDiv(addCar, `car__title`);
      const btnSelect = this.createBtn(`car__btn-select`, 'SELECT');
      const btnRemove = this.createBtn(`car__btn-remove`, 'REMOVE');
      const nameCar = this.addHTMLElement('H4', `car__name`, `${cars[i].name}`);
      addTitle.lastChild?.appendChild(btnSelect);
      addTitle.lastChild?.appendChild(btnRemove);
      addTitle.lastChild?.appendChild(nameCar);

      const addFieldCar = this.addDiv(addCar, `car-field`);
      const btnA = this.createBtn(`car__btn-start`, 'A');
      const btnB = this.createBtn(`car__btn-stop`, 'B');
      btnB.setAttribute('disabled', '');
      addFieldCar.lastChild?.appendChild(btnA);
      addFieldCar.lastChild?.appendChild(btnB);

      const addFieldRace = this.addHTMLElement('div', 'field-race', '');
      const addIcon = this.addCarIcon(addFieldRace, cars[i].color);
      addFieldCar.lastChild?.appendChild(addIcon);

      fragment.appendChild(addTitle);
      fragment.appendChild(addFieldCar);
    }
    racingElement?.appendChild(fragment);
  }

  public addCarIcon(fieldRace: HTMLElement, color: string): HTMLElement {
    const icon = document.createElement('span');
    icon.classList.add('car-icon');

    fetch('./icons/car.svg')
      .then((response) => response.text())
      .then((svgContent) => {
        icon.innerHTML = svgContent;

        const svg = icon.querySelector('svg');
        if (svg) {
          svg.style.fill = color;
          svg.style.width = '100px';
          svg.style.height = '50px';
        }
      })
      .catch((error) => {
        console.error('Not icon', error);
      });

    fieldRace.appendChild(icon);
    return fieldRace;
  }
}

export default RacingView;
