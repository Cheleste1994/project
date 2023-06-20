import { EditorFromTextArea } from 'codemirror';
import Input from '../input/input';
import ListLevels from './level.json';
import { LevelsInterface } from '../control/interface';

class Levels extends Input {
  public listLevels: LevelsInterface[];

  constructor() {
    super();
    this.listLevels = ListLevels;
  }

  public load(editorHTML: EditorFromTextArea, numberLevel: number): number {
    const { firstLine, lastLine } = this.listLevels[numberLevel];
    // const setLine = this.listLevels[numberLevel].set.join('\n ');
    const divElement = document.querySelector('.table-field');
    const tagsWithIndent = this.tagsElements(divElement).trim();

    editorHTML.setValue(`${firstLine}\n ${tagsWithIndent}\n${lastLine}`);
    return numberLevel;
  }

  public tagsElements(element: Element | null, indent = 0, isCentralTag = false): string {
    let tagsString = '';

    if (element !== null) {
      const tagName = element.tagName.toLowerCase();
      const isCentral = isCentralTag || tagName === 'div';

      if (!isCentral) {
        tagsString += ' '.repeat(indent);
        if (element.children.length === 0) {
          tagsString += `<${tagName} />\n`;
        } else {
          tagsString += `<${tagName}>\n`;
        }
      }

      for (let i = 0; i < element.children.length; i += 1) {
        const childElement = element.children[i];
        tagsString += this.tagsElements(childElement, indent + 2, isCentralTag);
      }

      if (!isCentral && element.children.length > 0) {
        tagsString += ' '.repeat(indent);
        tagsString += `</${tagName}>\n`;
      }
    }

    return tagsString;
  }
}

export default Levels;
