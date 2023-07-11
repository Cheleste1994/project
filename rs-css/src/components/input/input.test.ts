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

describe('addLevelChangeCheck', () => {
  it('should return the index of the next non-winning level when there is one', () => {
    const winCollection: Map<number, WinInfo> = new Map();
    ListLevels.forEach((lvl, index) => {
      winCollection.set(index, { isWin: false, isHelp: false });
    });
    winCollection.set(0, { isWin: true, isHelp: false });
    winCollection.set(1, { isWin: true, isHelp: false });
    winCollection.set(2, { isWin: true, isHelp: false });
    input = new Input(emitter, winCollection);

    const numberLevel = 0;
    const expectedIndex = 3;
    const result = input.addLevelChangeCheck(numberLevel);
    expect(result).toBe(expectedIndex);
  });

  it('should return 0 when all levels are winning', () => {
    const winCollection: Map<number, WinInfo> = new Map();
    ListLevels.forEach((lvl, index) => {
      winCollection.set(index, { isWin: true, isHelp: false });
    });
    input = new Input(emitter, winCollection);

    const numberLevel = 1;
    const expectedIndex = 0;
    const result = input.addLevelChangeCheck(numberLevel);
    expect(result).toBe(expectedIndex);
  });
});

describe('isTargetFound', () => {
  beforeEach(() => {
    emitter = new EventEmitter();
    const winCollection: Map<number, WinInfo> = new Map();

    ListLevels.forEach((lvl, index) => {
      winCollection.set(index, { isWin: lvl.isWin, isHelp: false });
    });
    input = new Input(emitter, winCollection);
    document.body.innerHTML = `
      <div class="target find"></div>
      <div></div>
      <div></div>
      <div class="target find"></div>
    `;
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should return true when the selectors target and find matched', () => {
    const result = input.isTargetFound();
    expect(result).toBe(true);
  });

  it('should return false when the selectors target and find did not match', () => {
    document.body.innerHTML += `
      <div class="target"></div>
      <div class="target find"></div>
      <div class="target"></div>
    `;
    const result = input.isTargetFound();
    expect(result).toBe(false);
  });
});
