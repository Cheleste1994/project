import './app.css';
import Table from '../table/table';
import Input from '../input/input';

class Game {
  public table: Table;

  public input: Input;

  constructor() {
    this.table = new Table();
    this.input = new Input();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public start() {
    const stuck = document.querySelector('.stuck');
    stuck?.addEventListener('click', () => {
      this.table.toogleStuck();
    });
    document.addEventListener('DOMContentLoaded', () => {
      this.input.editorRight();
      this.input.editorLeft();
    });
  }
}

export default Game;
