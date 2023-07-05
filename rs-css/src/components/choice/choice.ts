import './help.css';
import './choice.css';
import { LevelsInterface, WinInfo } from '../../assets/data/interface';
import ListLevels from '../../assets/data/level.json';
import EventEmitter from '../control/EventEmitter';

enum Selector {
  task = '.description h2',
  selector = '.selector-name',
  title = 'h2.title',
  syntax = '.syntax',
  hint = '.hint',
  examples = '.example',
}

const WIDTHPROGRESSBAR = 100;

class Choice {
  private listLevels: LevelsInterface[];

  protected emmiter: EventEmitter;

  private winCollection: Map<number, WinInfo>;

  constructor(emmiter: EventEmitter, winCollection: Map<number, WinInfo>) {
    this.emmiter = emmiter;
    this.winCollection = winCollection;
    this.listLevels = ListLevels;
    this.start();
    this.emmiter.subscribe('levelChange', () => {
      this.loadLevelHeader();
      this.loadLevelDescription();
      this.addListenerLevelChange();
    });
    this.emmiter.subscribe('gameOver', () => {
      this.addActiveBtnReset();
    });
  }

  public start(): void {
    this.loadLevelHeader();
    this.loadLevelDescription();
    this.addListenerBugerMenu();
    this.addListenerLevelChange();
    this.addListenerLevelNext();
    this.addListenerLevelPrev();
    this.addListenerButtonReset();
    this.addSaveBeforeUnload();
    this.addBacklightActiveLevel();
  }

  public toggleBurgerMenu(burgerIcon?: Element): void {
    const menu = document.querySelector('.burger-menu');
    menu?.classList.toggle('burger-menu_open');
    burgerIcon?.classList.toggle('burger-menu__icon_open');
  }

  private loadLevelDescription(): void {
    const description = this.listLevels[Number(localStorage.level)]?.description;
    (Object.keys(Selector) as (keyof typeof Selector)[]).forEach((name) => {
      const element = document.querySelector(Selector[name]);
      if (element) {
        element.innerHTML = description[name];
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
    this.listLevels.forEach((data, index) => {
      const elementA = document.createElement('a');
      const elementCheckmark = document.createElement('span');
      elementCheckmark.classList.add('checkmark');

      if (this.winCollection.get(index)?.isWin) {
        elementCheckmark.classList.add('checkmark_active');
      }

      const elementLevelNumber = document.createElement('span');
      elementLevelNumber.classList.add('level-number');
      elementLevelNumber.innerText = `${data.level + 1}`;
      elementA.appendChild(elementCheckmark);

      if (this.winCollection.get(index)?.isHelp) {
        const elementIconHelp = document.createElement('span');
        elementIconHelp.classList.add('help-icon_active');
        elementA.appendChild(elementIconHelp);
      }
      elementA.appendChild(elementLevelNumber);
      elementA.innerHTML += data.description.syntax;
      fragment.appendChild(elementA);
    });

    if (this.winCollection.get(Number(localStorage.level))?.isWin) {
      document.querySelector('.level-name__checkmark')?.classList.add('checkmark_active');
    } else {
      document.querySelector('.level-name__checkmark')?.classList.remove('checkmark_active');
    }
    if (list) {
      list.innerHTML = '';
    }
    list?.appendChild(fragment);

    const addBacklightActiveLevel = this.addBacklightActiveLevel();
    addBacklightActiveLevel();
  }

  public addBacklightActiveLevel(): () => void {
    let saveIndex = 0;
    return () => {
      const levels = document.querySelectorAll('.list-levels a');
      levels[saveIndex]?.classList.remove('list-level_active');
      levels[Number(localStorage.level)]?.classList.add('list-level_active');
      saveIndex = Number(localStorage.level);
    };
  }

  private addActiveBtnReset(): void {
    document.querySelector('.reset-progress')?.classList.add('reset-progress_completed');
    document.querySelector('.burger-menu')?.classList.add('burger-menu_open');
    document.querySelector('.burger-menu__icon')?.classList.add('burger-menu__icon_open');
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
        this.emmiter.emit('levelChange');
      });
    });
  }

  private addListenerLevelNext(): void {
    const next = document.querySelector('.level-nav .next');
    next?.addEventListener('click', () => {
      localStorage.level = Number(localStorage.level) < this.listLevels.length - 1 ? Number(localStorage.level) + 1 : 0;
      this.emmiter.emit('levelChange');
    });
  }

  private addListenerLevelPrev(): void {
    const prev = document.querySelector('.level-nav .prev');
    prev?.addEventListener('click', () => {
      const num = Number(localStorage.level);
      localStorage.level = num < this.listLevels.length && num > 0 ? num - 1 : this.listLevels.length - 1;
      this.emmiter.emit('levelChange');
    });
  }

  private addListenerButtonReset(): void {
    document.querySelector('.reset-progress')?.addEventListener('click', () => {
      document.querySelector('.burger-menu')?.classList.remove('burger-menu_open');
      document.querySelector('.burger-menu__icon')?.classList.toggle('burger-menu__icon_open');
      localStorage.level = 0;
      this.winCollection.forEach((lvl, i) => this.winCollection.set(i, { isWin: false, isHelp: false }));
      this.emmiter.emit('levelChange');
    });
  }

  private addSaveBeforeUnload(): void {
    window.addEventListener('beforeunload', () => {
      const winCollectionString = JSON.stringify([...this.winCollection]);
      localStorage.setItem('saveWinCollection', winCollectionString);
    });
  }
}

export default Choice;
