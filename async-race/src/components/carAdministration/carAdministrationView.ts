import { CarsInterface, ElementAttributes } from '../../assets/data/interface';
import { addBtn, addInput } from '../appController/helpers';
import './carAdministration.css';

class CarAdministrationView {
  private addBtn: (
    element: HTMLElement,
    className: string,
    text: string,
    attributes: ElementAttributes[],
  ) => HTMLElement;

  private addInput: (element: HTMLElement, className: string, attributes: { [key: string]: string }[]) => HTMLElement;

  constructor(main: HTMLElement) {
    this.addBtn = addBtn;
    this.addInput = addInput;
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
    const attributesCreate: ElementAttributes[] = [{ type: 'text' }, { list: 'car-list' }];
    const inputCreate = this.addInput(fieldCarInput, 'cars-create__input', attributesCreate);

    const attributesBtn = [{ type: 'button' }];

    const attributesColor: ElementAttributes[] = [{ type: 'color' }];
    const inputColorCreate = this.addInput(inputCreate, 'cars-create__color', attributesColor);

    const btnCreate = this.addBtn(inputColorCreate, 'cars-create__button', 'CREATE', attributesBtn);

    const attributesInputUpdate: ElementAttributes[] = [{ type: 'text', disabled: '' }];
    const inputUpdate = this.addInput(fieldCarUpdate, 'cars-update__input', attributesInputUpdate);

    const inputColorUpdate = this.addInput(inputUpdate, 'cars-update__color', attributesColor);

    const btnUpdate = this.addBtn(inputColorUpdate, 'cars-update__button', 'UPDATE', attributesBtn);

    const btnRace = this.addBtn(fieldCarGenerate, 'cars-generate__btn-race', 'RACE', attributesBtn);
    const btnReset = this.addBtn(btnRace, 'cars-generate__btn-reset', 'RESET', attributesBtn);
    const btnGenerate = this.addBtn(btnReset, 'cars-generate__btn-generate', 'GENERATE CARS', attributesBtn);

    divCarAdministration.appendChild(btnCreate);
    divCarAdministration.appendChild(btnUpdate);
    divCarAdministration.appendChild(btnGenerate);
    main.appendChild(divCarAdministration);
    return main;
  }

  public addDatalistName(carsData: CarsInterface[]): void {
    const carsCreate = document.querySelector('.cars-create');
    const datalist = document.querySelector('#car-list');
    if (datalist) {
      datalist.remove();
    }
    const datalistElement = document.createElement('datalist');
    datalistElement.id = 'car-list';

    for (let i = 0; i < carsData.length; i += 1) {
      const optionElement = document.createElement('option');
      optionElement.value = carsData[i].name;
      datalistElement.appendChild(optionElement);
    }
    carsCreate?.appendChild(datalistElement);
  }

  public hideBlockCarAdministration(): void {
    const carAdministration = document.querySelector('.car-administration');
    carAdministration?.classList.add('car-administration_hide');
  }

  public visibleBlockCarAdministration(): void {
    const carAdministration = document.querySelector('.car-administration');
    carAdministration?.classList.remove('car-administration_hide');
  }

  public disabledInput(): void {
    const input = document.querySelector('.cars-update__input') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.setAttribute('disabled', '');
    }
  }
}

export default CarAdministrationView;
