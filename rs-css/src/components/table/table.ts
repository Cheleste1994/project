import './table.css';
import ListLevels from '../../assets/data/level.json';
import { LevelsInterface, NestedTag } from '../../assets/data/interface';
import EventEmitter from '../control/EventEmitter';

class Table {
  private listLevels: LevelsInterface[];

  private emmiter: EventEmitter;

  constructor(emmiter: EventEmitter) {
    this.emmiter = emmiter;
    this.listLevels = ListLevels;
    this.start();
    this.loadTable(this.listLevels[Number(localStorage.level)]);
    this.emmiter.subscribe('targetFound', () => {
      this.loadTable(this.listLevels[Number(localStorage.level)]);
    });
    this.emmiter.subscribe('levelChange', () => {
      this.loadTable(this.listLevels[Number(localStorage.level)]);
    });
    this.emmiter.subscribe('levelNext', () => {
      this.loadTable(this.listLevels[Number(localStorage.level)]);
    });
    this.emmiter.subscribe('levelPrev', () => {
      this.loadTable(this.listLevels[Number(localStorage.level)]);
    });
  }

  protected start(): void {
    this.addListenerToogleStuck();
    this.addListenerHelp();
  }

  private loadTable(level: LevelsInterface): void {
    const table = document.querySelector('.table-field');
    const fragment = document.createDocumentFragment();

    const processTags = (tags: (string | NestedTag | undefined)[]): HTMLElement[] => {
      return tags.map((tag) => {
        if (typeof tag === 'object') {
          const [tagName, nestedTags] = Object.entries(tag)[0];
          const element = document.createElement(tagName);
          const childElements = processTags(Array.isArray(nestedTags) ? nestedTags : [nestedTags]);
          childElements.forEach((childElement) => {
            element.appendChild(childElement);
          });
          return element;
        }
        if (typeof tag === 'string') {
          return document.createElement(tag);
        }
        throw new Error(`Invalid tag: ${tag}`);
      });
    };

    const elements = processTags(level.tag);
    elements.forEach((element) => {
      const target = this.findTarget(element, level.target);
      if (target !== null) {
        target.className = 'target';
      }
      fragment.appendChild(element);
    });
    if (table !== null) {
      table.innerHTML = '';
    }
    table?.appendChild(fragment);
  }

  private findTarget(element: Element, target: string[]): Element | null {
    if (target.length === 0) return null;

    const tagName = target[0];
    const remainingTags = target.slice(1);

    if (element.tagName.toLowerCase() !== tagName) return null;

    if (remainingTags.length === 0) return element;

    for (let i = 0; i < element.children.length; i += 1) {
      const childElement = element.children[i];
      const foundElement = this.findTarget(childElement, remainingTags);

      if (foundElement !== null) return foundElement;
    }
    return null;
  }

  private addListenerToogleStuck(): void {
    document.querySelector('.stuck')?.addEventListener('click', () => {
      document.querySelector('.stuck-open')?.classList.toggle('stuck-open_active');
    });
  }

  private addListenerHelp(): void {
    document.querySelector('.note-toggle')?.addEventListener('click', () => {
      this.emmiter.emit('help', true);
    });
  }
}

export default Table;
