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

  public load(editorHTML: EditorFromTextArea, numberLevel = 3): number {
    const { firstLine, lastLine } = this.listLevels[numberLevel];
    const setLine = this.listLevels[numberLevel].set.join('\n ');
    editorHTML.setValue(`${firstLine}\n ${setLine}\n${lastLine}`);
    return numberLevel;
  }
}

export default Levels;
