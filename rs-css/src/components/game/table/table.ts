import './table.css';
import { LevelsInterface, NestedTag } from '../control/interface';

class Table {
  public toogleStuck(): void {
    const stuck = document.querySelector('.stuck-open');
    stuck?.classList.toggle('stuck-open_active');
  }

  public loadTable(level: LevelsInterface): void {
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
    table?.appendChild(fragment);
  }

  public findTarget(element: Element, target: string[]): Element | null {
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
}

export default Table;
