import './app.css';
import Table from '../table/table';
import Input from '../input/input';
import Viewer from '../viewer/viewer';
import EventEmitter from './EventEmitter';
import Choice from '../choice/choice';
import { EventData, WinInfo } from '../../assets/data/interface';

class Game {
  public table: Table;

  public input: Input;

  public viewer: Viewer;

  public emmiter: EventEmitter<EventData>;

  public choice: Choice;

  constructor(winCollection: Map<number, WinInfo>) {
    this.start();
    this.emmiter = new EventEmitter<EventData>();
    this.table = new Table(this.emmiter);
    this.input = new Input(this.emmiter, winCollection);
    this.viewer = new Viewer(this.emmiter);
    this.choice = new Choice(this.emmiter, winCollection);
  }

  public start(): void {}
}

export default Game;
