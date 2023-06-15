import './app.css';
import Table from '../table/table';
import Input from '../input/input';

class Game {
  public table: Table;

  constructor() {
    this.table = new Table();
    this.table = new Input();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public start() {
    console.log(123);
  }
}

export default Game;
