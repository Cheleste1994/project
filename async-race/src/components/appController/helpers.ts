import { ElementAttributes } from '../../assets/data/interface';

function addBtn(element: HTMLElement, className: string, text: string, attributes: ElementAttributes[]): HTMLElement {
  const btnCreate = document.createElement('button');
  attributes.forEach((type) => {
    Object.entries(type).forEach(([key, value]) => {
      btnCreate.setAttribute(key, value);
    });
  });
  btnCreate.classList.add(className);
  btnCreate.innerText = text;
  element.appendChild(btnCreate);

  return element;
}

function addInput(element: HTMLElement, className: string, attributes: ElementAttributes[]): HTMLElement {
  const inputElement = document.createElement('input');
  attributes.forEach((type) => {
    Object.entries(type).forEach(([key, value]) => {
      inputElement.setAttribute(key, value);
    });
  });
  inputElement.classList.add(className);

  element.appendChild(inputElement);
  return element;
}

function addHTMLElement(elementName: string, className: string, text: string): HTMLElement {
  const element = document.createElement(elementName);
  element.classList.add(className);
  element.innerText = text;
  return element;
}

function addDiv(element: HTMLElement, className: string): HTMLElement {
  const divElement = document.createElement('div');
  divElement.classList.add(className);
  element.appendChild(divElement);
  return element;
}

export { addBtn, addInput, addHTMLElement, addDiv };
