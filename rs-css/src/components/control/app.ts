import './app.css';
import Table from '../table/table';
import Input from '../input/input';
import Viewer from '../viewer/viewer';
import EventEmitter from './EventEmitter';
import Choice from '../choice/choice';

class Game {
  public table: Table;

  public input: Input;

  public viewer: Viewer;

  public emmiter: EventEmitter;

  private choice: Choice;

  constructor() {
    this.emmiter = new EventEmitter();
    this.table = new Table(this.emmiter);
    this.input = new Input(this.emmiter);
    this.viewer = new Viewer(this.emmiter);
    this.choice = new Choice(this.emmiter);
  }

  public start(): void {}
}

export default Game;
