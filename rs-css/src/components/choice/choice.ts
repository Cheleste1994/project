import './help.css';
import './choice.css';
import { LevelsInterface } from '../../assets/data/interface';
import ListLevels from '../../assets/data/level.json';
import EventEmitter from '../control/EventEmitter';

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
  private listLevels: LevelsInterface[];

  protected emmiter: EventEmitter;

  constructor(emmiter: EventEmitter) {
    this.emmiter = emmiter;
    this.listLevels = ListLevels;
    this.start();
    this.emmiter.subscribe('targetFound', () => {
      this.loadLevelHeader();
      this.loadLevelDescription();
      this.addListenerLevelChange();
    });
    this.emmiter.subscribe('levelChange', () => {
      this.loadLevelHeader();
      this.loadLevelDescription();
      this.addListenerLevelChange();
    });
    this.emmiter.subscribe('levelChangeViaInput', () => {
      this.loadLevelHeader();
      this.loadLevelDescription();
      this.addListenerLevelChange();
    });
    this.emmiter.subscribe('levelNext', () => {
      this.loadLevelHeader();
      this.loadLevelDescription();
      this.addListenerLevelChange();
    });
    this.emmiter.subscribe('levelPrev', () => {
      this.loadLevelHeader();
      this.loadLevelDescription();
      this.addListenerLevelChange();
    });
  }

  private start(): void {
    this.loadLevelHeader();
    this.loadLevelDescription();
    this.addListenerBugerMenu();
    this.addListenerLevelChange();
    this.addListenerLevelNext();
    this.addListenerLevelPrev();
    this.addSaveBeforeUnload();
  }

  private toggleBurgerMenu(burgerIcon?: Element): void {
    const menu = document.querySelector('.burger-menu');
    menu?.classList.toggle('burger-menu_open');
    burgerIcon?.classList.toggle('burger-menu__icon_open');
  }

  private loadLevelDescription(): void {
    const { description } = this.listLevels[Number(localStorage.level)];
    Object.keys(Selector).forEach((name) => {
      if (typeof name === 'string') {
        const element = document.querySelector(Selector[`${name}`]);
        if (element) {
          element.innerHTML = description[name];
        }
      }
    });

    const levelNameText = document.querySelector('.level-name__text');
    const lengthlistLevels = this.listLevels.length;
    if (levelNameText) {
      levelNameText.innerHTML = `Level ${Number(localStorage.level) + 1} of ${lengthlistLevels}`;
    }

    const progressLine = document.querySelector('.level-progress .progress') as HTMLElement;
    if (progressLine) {
      progressLine.style.width = `${(WIDTHPROGRESSBAR / lengthlistLevels) * (Number(localStorage.level) + 1)}%`;
    }
  }

  private loadLevelHeader(): void {
    const list = document.querySelector('.list-levels');
    const fragment = document.createDocumentFragment();
    this.listLevels.forEach((data) => {
      const elementA = document.createElement('a');
      const elementCheckmark = document.createElement('span');
      elementCheckmark.classList.add('checkmark');

      if (data.isWin) {
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

    if (this.listLevels[Number(localStorage.level)].isWin) {
      document.querySelector('.level-name__checkmark')?.classList.add('checkmark_active');
    } else {
      document.querySelector('.level-name__checkmark')?.classList.remove('checkmark_active');
    }

    if (list) {
      list.innerHTML = '';
    }
    list?.appendChild(fragment);
  }

  private addListenerBugerMenu(): void {
    const burger = document.querySelector('.burger-menu__icon');
    burger?.addEventListener('click', () => {
      this.toggleBurgerMenu(burger);
    });
  }

  private addListenerLevelChange(): void {
    const levels = document.querySelectorAll('.list-levels a');
    levels.forEach((level, index) => {
      level.addEventListener('click', () => {
        localStorage.level = index;
        document.querySelector('.burger-menu')?.classList.remove('burger-menu_open');
        document.querySelector('.burger-menu__icon')?.classList.toggle('burger-menu__icon_open');
        this.emmiter.emit('levelChange', true);
      });
    });
  }

  private addListenerLevelNext(): void {
    const next = document.querySelector('.level-nav .next');
    next?.addEventListener('click', () => {
      localStorage.level = Number(localStorage.level) < this.listLevels.length - 1 ? Number(localStorage.level) + 1 : 0;
      this.emmiter.emit('levelNext', true);
    });
  }

  private addListenerLevelPrev(): void {
    const prev = document.querySelector('.level-nav .prev');
    prev?.addEventListener('click', () => {
      const num = Number(localStorage.level);
      localStorage.level = num < this.listLevels.length && num > 0 ? num - 1 : this.listLevels.length - 1;
      this.emmiter.emit('levelPrev', true);
    });
  }

  private addSaveBeforeUnload(): void {
    window.addEventListener('beforeunload', () => {
      const saveWin = [];
      for (let i = 0; i < this.listLevels.length; i += 1) {
        saveWin.push(this.listLevels[i].isWin);
      }
      localStorage.setItem('save', saveWin.join(','));
    });
  }
}

export default Choice;
