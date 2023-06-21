import './app.css';
import Table from '../table/table';
import Input from '../input/input';
import Levels from '../levels/loadLevels';

class Game {
  public table: Table;

  public input: Input;

  public levels: Levels;

  constructor() {
    this.table = new Table();
    this.input = new Input();
    this.levels = new Levels();
  }

  public start(): void {
    const stuck = document.querySelector('.stuck');
    stuck?.addEventListener('click', () => {
      this.table.toogleStuck();
    });

    document.addEventListener('DOMContentLoaded', () => {
      const editorRight = this.input.editorRight();
      if (editorRight) {
        this.table.loadTable(this.levels.listLevels[0]);
        this.levels.load(editorRight, 0);
      }
      this.input.editorLeft();
    });
  }

  // public listeners(): void {
  //   const inputEnter = document.querySelector('.css-input');
  //   const btnEnter = document.querySelector('.enter-button');
  //   const inputField = document.querySelector('.input-field');

  //   inputEnter?.addEventListener('keydown', (event: KeyboardEvent | Event) => {
  //     if (event instanceof KeyboardEvent && event.code === 'Enter') {
  //       const inputValue = (event.target as HTMLInputElement).value;
  //       this.input.addMarker<string>(inputValue);
  //       btnEnter?.classList.add('enter-button_active');
  //       if (!this.input.findTarget()) {
  //         inputField?.classList.add('input-field_boom');
  //       }
  //     }
  //   });

  //   inputEnter?.addEventListener('keyup', (event: KeyboardEvent | Event) => {
  //     if (event instanceof KeyboardEvent && event.code === 'Enter') {
  //       const inputValue = (event.target as HTMLInputElement).value;
  //       if (this.input.findTarget()) {
  //         const { codeMirrorInstance } = this.input;
  //         if (codeMirrorInstance) {
  //           const { level } = localStorage;
  //           this.table.loadTable(this.levels.listLevels[Number(level) + 1]);
  //           this.levels.load(codeMirrorInstance, level);
  //           this.input.writeWin(Number(level));
  //           localStorage.level = Number(level) + 1;
  //           this.description.loadLevelDescription();
  //         }
  //       }
  //       this.input.addMarker<string>(inputValue);
  //       btnEnter?.classList.remove('enter-button_active');
  //       inputField?.classList.remove('input-field_boom');
  //       const inputElement = event.target as HTMLInputElement;
  //       this.input.removeMarker();
  //       inputElement.value = '';
  //     }
  //   });
  // }
}

export default Game;
