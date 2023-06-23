import './help.css';
import './choice.css';
import { LevelsInterface } from '../../assets/data/interface';
import ListLevels from '../../assets/data/level.json';

type SelectorType = {
  [key: string]: string;
};

const Selector: SelectorType = {
  selector: '.selector-name',
  title: 'h2.title',
  syntax: '.syntax',
  hint: '.hint',
  examples: '.example',
};

const WIDTHPROGRESSBAR = 100;

class Choice {
  private json: LevelsInterface[];

  constructor() {
    this.json = ListLevels;
  }

  public start(): void {
    this.loadLevelHeader();
    this.loadLevelDescription();
    this.listenersBugerMenu();
  }

  public toggleBurgerMenu(burgerIcon?: Element): void {
    const menu = document.querySelector('.burger-menu');
    menu?.classList.toggle('burger-menu_open');
    burgerIcon?.classList.toggle('burger-menu__icon_open');
  }

  public loadLevelDescription(): void {
    const { description } = this.json[Number(localStorage.level)];
    Object.keys(Selector).forEach((name) => {
      if (typeof name === 'string') {
        const element = document.querySelector(Selector[`${name}`]);
        if (element) {
          element.innerHTML = description[name];
        }
      }
    });

    const levelNameText = document.querySelector('.level-name__text');
    const lengthJson = this.json.length;
    if (levelNameText) {
      levelNameText.innerHTML = `Level ${Number(localStorage.level) + 1} of ${lengthJson}`;
    }

    const progressLine = document.querySelector('.level-progress .progress') as HTMLElement;
    if (progressLine) {
      progressLine.style.width = `${(WIDTHPROGRESSBAR / lengthJson) * (Number(localStorage.level) + 1)}%`;
    }
  }

  public loadLevelHeader(): void {
    const list = document.querySelector('.list-levels');
    const fragment = document.createDocumentFragment();
    this.json.forEach((data) => {
      const elementA = document.createElement('a');
      const elementCheckmark = document.createElement('span');
      elementCheckmark.classList.add('checkmark');

      if (data.win) {
        elementCheckmark.classList.add('checkmark_active');
      }

      const elementLevelNumber = document.createElement('span');
      elementLevelNumber.classList.add('level-number');
      elementLevelNumber.innerText = `${data.level + 1}`;
      elementA.appendChild(elementCheckmark);
      elementA.appendChild(elementLevelNumber);
      elementA.innerHTML += data.title;

      fragment.appendChild(elementA);
    });
    if (list) {
      list.innerHTML = '';
    }
    list?.appendChild(fragment);
  }

  private listenersBugerMenu(): void {
    const burger = document.querySelector('.burger-menu__icon');
    burger?.addEventListener('click', () => {
      this.toggleBurgerMenu(burger);
    });
    this.loadLevelHeader();
    this.loadLevelDescription();
  }
}

export default Choice;
