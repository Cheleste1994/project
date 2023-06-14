import './app.css';
import Table from '../table/table';

class Game {
  public table: Table;

  constructor() {
    this.table = new Table();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public start() {
    console.log(123);
  }
}

export default Game;
