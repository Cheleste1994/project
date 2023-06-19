import { EditorFromTextArea } from 'codemirror';
// import ListLevels from './level.json';

class Levels {
  public async load(levels: EditorFromTextArea): Promise<void> {
    const newValue = levels.getValue();
    const res = await fetch('data/level.json');
    const listLevels = await res.json();
    console.log(listLevels);
    console.log(newValue);
    // levels.setValue(newValue);
  }
}

export default Levels;
