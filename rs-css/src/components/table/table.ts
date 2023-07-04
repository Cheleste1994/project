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
    this.emmiter.subscribe('levelChange', () => {
      this.loadTable(this.listLevels[Number(localStorage.level)]);
      this.addListenerHoverTable();
    });
    this.emmiter.subscribe('changeHoverELementTable', (obj) => {
      if (typeof obj === 'object') {
        this.changeHoverElementTable(obj.element, obj.isAdd);
      }
    });
  }

  protected start(): void {
    window.addEventListener('load', () => {
      this.addListenerToogleStuck();
      this.addListenerHelp();
      this.addListenerHoverTable();
    });
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
          const newElement = document.createElement(tag.split(' ')[0]);
          if (tag.split(' ')[1]) {
            newElement.classList.add('small');
          }
          return newElement;
        }
        throw new Error(`Invalid tag: ${tag}`);
      });
    };

    const elements = processTags(level.tag);
    elements.forEach((element) => {
      level.target.forEach((target) => this.findAndPlaceTarget(element, target));
      fragment.appendChild(element);
    });
    if (table !== null) {
      table.innerHTML = '';
    }
    table?.appendChild(fragment);
  }

  private findAndPlaceTarget(element: Element, target: string[]): void {
    const targetCopy = [...target];
    const tagName = targetCopy.shift();

    if (element.tagName.toLowerCase() !== tagName) {
      return;
    }

    if (targetCopy.length === 0) {
      element.classList.add('target');
      return;
    }

    for (let i = 0; i < element.children.length; i += 1) {
      const childElement = element.children[i];
      this.findAndPlaceTarget(childElement, targetCopy);
    }
  }

  private addListenerToogleStuck(): void {
    document.querySelector('.stuck')?.addEventListener('click', () => {
      document.querySelector('.stuck-open')?.classList.toggle('stuck-open_active');
    });
  }

  private addListenerHelp(): void {
    document.querySelector('.note-toggle')?.addEventListener('click', () => {
      this.emmiter.emit('help');
    });
  }

  private changeHoverElementTable(element: HTMLElement, isAdd: boolean): void {
    if (isAdd) {
      element.classList.add('table_hover');
      if (element.classList.contains('small')) {
        element.setAttribute('data-content', `<${element.localName} class="small"/>`);
      } else {
        element.setAttribute('data-content', `<${element.localName}> </${element.localName}>`);
      }
    } else {
      element.classList.remove('table_hover');
      element.removeAttribute('data-content');
    }
  }

  private addListenerHoverTable(): void {
    const tableElements = document.querySelector('.table-field') as HTMLElement;
    const children = tableElements.querySelectorAll<HTMLElement>('*');
    children.forEach((el: HTMLElement, index) => {
      el.addEventListener('mouseover', (event: MouseEvent) => {
        const element = event.target as HTMLElement;
        this.changeHoverElementTable(element, true);
        this.emmiter.emit('changeHoverLineEditHTML', { element, isAdd: true, index });
      });

      el.addEventListener('mouseout', (event) => {
        const element = event.target as HTMLElement;
        this.changeHoverElementTable(element, false);
        this.emmiter.emit('changeHoverLineEditHTML', { element, isAdd: false, index });
      });
    });
  }
}

export default Table;
