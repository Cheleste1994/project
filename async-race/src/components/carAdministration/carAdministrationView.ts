import { CarsInterface } from '../../assets/data/interface';
import './carAdministration.css';

class CarAdministrationView {
  constructor(main: HTMLElement) {
    this.createHTMLElementBlock(main);
  }

  public createHTMLElementBlock(main: HTMLElement): HTMLElement {
    const divCarAdministration = document.createElement('div');
    divCarAdministration.classList.add('car-administration');
    const fieldCarInput = document.createElement('div');
    fieldCarInput.classList.add('cars-create');
    const fieldCarUpdate = document.createElement('div');
    fieldCarUpdate.classList.add('cars-update');
    const fieldCarGenerate = document.createElement('div');
    fieldCarGenerate.classList.add('cars-generate');

    const inputCreate = this.addInputCreate(fieldCarInput);
    const inputColorCreate = this.addInputColor(inputCreate, 'cars-create__color');
    const btnCreate = this.addBtn(inputColorCreate, 'cars-create__button', 'CREATE');

    const inputUpdate = this.addInputUpdate(fieldCarUpdate);
    const inputColorUpdate = this.addInputColor(inputUpdate, 'cars-update__color');
    const btnUpdate = this.addBtn(inputColorUpdate, 'cars-update__button', 'UPDATE');

    const btnRace = this.addBtn(fieldCarGenerate, 'cars-generate__btn-race', 'RACE');
    const btnReset = this.addBtn(btnRace, 'cars-generate__btn-reset', 'RESET');
    const btnGenerate = this.addBtn(btnReset, 'cars-generate__btn-generate', 'GENERATE CARS');

    divCarAdministration.appendChild(btnCreate);
    divCarAdministration.appendChild(btnUpdate);
    divCarAdministration.appendChild(btnGenerate);
    main.appendChild(divCarAdministration);
    return main;
  }

  private addInputCreate(element: HTMLElement): HTMLElement {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('list', 'car-list');
    inputElement.classList.add('cars-create__input');

    element.appendChild(inputElement);
    return element;
  }

  public addDatalistName(carsDara: CarsInterface[]): void {
    const carsCreate = document.querySelector('.cars-create');
    const datalistElement = document.createElement('datalist');
    datalistElement.id = 'car-list';

    for (let i = 0; i < carsDara.length; i += 1) {
      const optionElement = document.createElement('option');
      optionElement.value = carsDara[i].name;
      datalistElement.appendChild(optionElement);
    }
    carsCreate?.appendChild(datalistElement);
  }

  private addInputColor(element: HTMLElement, className: string): HTMLElement {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'color');
    inputElement.classList.add(className);
    element.appendChild(inputElement);

    return element;
  }

  private addBtn(element: HTMLElement, className: string, text: string): HTMLElement {
    const btnCreate = document.createElement('button');
    btnCreate.setAttribute('type', 'button');
    btnCreate.classList.add(className);
    btnCreate.innerText = text;
    element.appendChild(btnCreate);

    return element;
  }

  private addInputUpdate(element: HTMLElement): HTMLElement {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.classList.add('cars-update__input');
    inputElement.setAttribute('disabled', '');
    element.appendChild(inputElement);

    return element;
  }

  public hideBlockCarAdministration(): void {
    const carAdministration = document.querySelector('.car-administration');
    carAdministration?.classList.add('car-administration_hide');
  }

  public visibleBlockCarAdministration(): void {
    const carAdministration = document.querySelector('.car-administration');
    carAdministration?.classList.remove('car-administration_hide');
  }

  public addActiveInputUpdate(carName: string): void {
    const input = document.querySelector('.cars-update__input') as HTMLInputElement;
    if (input) {
      input.value = carName;
      input.removeAttribute('disabled');
    }
  }

  public disabledInputUpdate(): void {
    const input = document.querySelector('.cars-update__input') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.setAttribute('disabled', '');
    }
  }
}

export default CarAdministrationView;
