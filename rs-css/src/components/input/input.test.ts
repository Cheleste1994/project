import EventEmitter from '../control/EventEmitter';
import ListLevels from '../../assets/data/level.json';

import Input from './input';
import { EventData, WinInfo } from '../../assets/data/interface';

jest.mock('./input.css', () => {});
jest.mock('codemirror/lib/codemirror.css', () => {});
jest.mock('codemirror/theme/darcula.css', () => {});
jest.mock('codemirror/theme/3024-day.css', () => {});

let emitter: EventEmitter<EventData>;
let input: Input;

describe('Input', () => {
  beforeEach(() => {
    emitter = new EventEmitter();
    const winCollection: Map<number, WinInfo> = new Map();

    ListLevels.forEach((lvl, index) => {
      winCollection.set(index, { isWin: lvl.isWin, isHelp: false });
    });
    input = new Input(emitter, winCollection);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create an instance of Input', () => {
    expect(input).toBeInstanceOf(Input);
  });
  it('should have the start method', () => {
    expect(input.start).toBeInstanceOf(Function);
  });

  it('should not throw an error with invalid data', () => {
    const inputValue = 'orange?bento .sm*-=++-=all';
    expect(() => {
      try {
        input.addMarker(inputValue);
      } catch (error) {
        fail('An error was thrown');
      }
    }).not.toThrow();

    const validInputValue = 'plate:nth-of-type(2n) > * > * *';
    expect(() => {
      try {
        input.addMarker(validInputValue);
      } catch (error) {
        fail('An error was thrown');
      }
    }).not.toThrow();
  });
});
