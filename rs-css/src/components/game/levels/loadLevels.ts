import { EditorFromTextArea } from 'codemirror';
import ListLevels from './level.json';

class Levels {
  public async load(editorHTML: EditorFromTextArea): Promise<void> {
    const newValue = editorHTML.getValue();
    // const res = await fetch(`${ListLevels}`);
    // const listLevels = await res.json();
    // const endLine = editorHTML.lastLine() - 1;
    // for (let i = 0; i < listLevels[0].set.length; i += 1) {

    // }
    console.log(ListLevels);
    console.log(newValue);
    // levels.setValue(newValue);
  }
}

export default Levels;
