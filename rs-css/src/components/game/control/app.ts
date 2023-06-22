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
        this.table.loadTable(this.levels.listLevels[Number(localStorage.level)]);
        this.levels.load(editorRight, Number(localStorage.level));
      }
      this.input.editorLeft();
    });
  }
}

export default Game;
