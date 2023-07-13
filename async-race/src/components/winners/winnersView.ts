import EventEmitter from '../appController/EventEmitter';
import './winners.css';

class WinnersView {
  public emitter: EventEmitter<unknown>;

  constructor(emitter: EventEmitter<unknown>, main: HTMLElement) {
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
}

export default WinnersView;
