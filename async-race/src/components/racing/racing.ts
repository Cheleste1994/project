import './racing.css';

class Racing {
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
}

export default Racing;
