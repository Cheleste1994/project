import './table.css';
import { LevelsInterface, NestedTag } from '../control/interface';

class Table {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

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
      fragment.appendChild(element);
    });

    table?.appendChild(fragment);
  }
}

export default Table;
