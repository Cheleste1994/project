import { CarsInterface, WinnersInterface } from '../../assets/data/interface';
import { addBtn, addDiv, addHTMLElement } from '../appController/helpers';
import './racing.css';

class RacingView {
  private addBtn: (
    element: HTMLElement,
    className: string,
    text: string,
    attributes: { [key: string]: string }[],
  ) => HTMLElement;

  private addHTMLElement: (elementName: string, className: string, text: string) => HTMLElement;

  private addDiv: (element: HTMLElement, className: string) => HTMLElement;

  constructor(main: HTMLElement) {
    this.addHTMLElement = addHTMLElement;
    this.addBtn = addBtn;
    this.addDiv = addDiv;
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
    if (addPagination.lastChild) {
      const attribute = [{ type: 'button' }];
      this.addBtn(addPagination.lastChild as HTMLElement, 'pagination__prev', 'Previous', attribute);
      this.addBtn(addPagination.lastChild as HTMLElement, 'pagination__next', 'Next', attribute);
    }
    const addBlockCarFinish = this.addDiv(addPagination, 'finish');
    const finishCar = this.addHTMLElement('span', 'finish__title', '');
    addBlockCarFinish.lastChild?.appendChild(finishCar);

    main.appendChild(addBlockCarFinish);
    return main;
  }

  public hideBlocGarage(): void {
    const garage = document.querySelector('.garage');
    garage?.classList.add('garage_hide');
  }

  public visibleBlocGarage(): void {
    const garage = document.querySelector('.garage');
    garage?.classList.remove('garage_hide');
  }

  public generateRaceField(cars: CarsInterface[], firstCarPerPage = 0, lastCarPerPage = 1): void {
    const racingElement = document.querySelector('.racing');
    const fragment = document.createDocumentFragment();
    for (let i = firstCarPerPage; i < lastCarPerPage; i += 1) {
      const addCar = document.createElement('div');
      addCar.className = `cars car-${cars[i].id}`;
      const addTitle = this.addDiv(addCar, `car__title`);
      const nameCar = this.addHTMLElement('H4', `car__name`, `${cars[i].name}`);
      const attribute = [{ type: 'button' }];

      if (addTitle.lastChild) {
        this.addBtn(addTitle.lastChild as HTMLElement, `car__btn-select`, 'SELECT', attribute);
        this.addBtn(addTitle.lastChild as HTMLElement, `car__btn-remove`, 'REMOVE', attribute);
        addTitle.lastChild.appendChild(nameCar);
      }

      const addFieldCar = this.addDiv(addCar, `car-field`);
      if (addFieldCar.lastChild) {
        this.addBtn(addFieldCar.lastChild as HTMLElement, `car__btn-start`, 'A', attribute);
        this.addBtn(addFieldCar.lastChild as HTMLElement, `car__btn-stop`, 'B', [{ type: 'button' }, { disabled: '' }]);
      }

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

  public changeQuantityCar(quantity: number): void {
    const titleCars = document.querySelector('.garage-title__cars') as HTMLElement;
    titleCars.innerHTML = `(${quantity})`;
  }

  public addNextPage(pageNumber: number): void {
    const pageH3 = document.querySelector('.page-number__h3');
    if (pageH3) {
      pageH3.innerHTML = `Page #${pageNumber}`;
    }
  }

  public cleanPageRacing(): void {
    const racing = document.querySelector('.racing');
    if (racing) {
      racing.innerHTML = '';
    }
  }

  public updateCar(dataCar: CarsInterface): void {
    const car = document.querySelector(`.car-${dataCar.id}`);
    const carName = car?.querySelector('.car__name');
    const carImg = car?.querySelector('svg');
    if (carImg) {
      carImg.style.fill = dataCar.color;
    }
    if (carName) {
      carName.innerHTML = dataCar.name;
    }
  }

  public addAnimationStartDrive(carRace: Element, raceDistance: number, speed = '0.3'): void {
    const carIcon = carRace.querySelector('.car-icon') as HTMLElement;
    const btnStart = carRace.querySelector('.car__btn-start');
    const btnStop = carRace.querySelector('.car__btn-stop');
    if (carIcon) {
      carIcon.style.transition = `all ${speed}s linear`;
      carIcon.style.transform = `translateX(${raceDistance}px)`;
    }
    btnStart?.setAttribute('disabled', '');
    btnStop?.removeAttribute('disabled');
  }

  public addAnimationStopDrive(carRace: Element): void {
    const carIcon = carRace.querySelector('.car-icon') as HTMLElement;
    const btnStart = carRace.querySelector('.car__btn-start');
    const btnStop = carRace.querySelector('.car__btn-stop');
    carIcon?.removeAttribute('style');
    btnStop?.setAttribute('disabled', '');
    btnStart?.removeAttribute('disabled');
  }

  public addAnimationFinishCar(winsCar: WinnersInterface, carName: string): void {
    const finishTitle = document.querySelector('.finish__title');
    const finishElement = document.querySelector('.finish');
    finishElement?.classList.add('finish_active');
    if (finishTitle) {
      finishTitle.innerHTML = `${carName} finished first! Time: ${winsCar.time}s.`;
    }
  }
}

export default RacingView;
