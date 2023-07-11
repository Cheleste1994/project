import EventEmitter from '../control/EventEmitter';
import ListLevels from '../../assets/data/level.json';

import Choice from './choice';
import { EventData, WinInfo } from '../../assets/data/interface';

jest.mock('./help.css', () => {});
jest.mock('./choice.css', () => {});

let emitter: EventEmitter<EventData>;
let choice: Choice;

describe('Choice', () => {
  beforeEach(() => {
    emitter = new EventEmitter();
    const winCollection: Map<number, WinInfo> = new Map();

    ListLevels.forEach((lvl, index) => {
      winCollection.set(index, { isWin: lvl.isWin, isHelp: false });
    });

    choice = new Choice(emitter, winCollection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of Choice', () => {
    expect(choice).toBeInstanceOf(Choice);
  });

  it('should have the start method', () => {
    expect(choice.start).toBeInstanceOf(Function);
  });

  it('should modify classes for the provided element', () => {
    const burgerIcon = document.createElement('div');

    choice.toggleBurgerMenu(burgerIcon);

    expect(burgerIcon.classList).toContain('burger-menu__icon_open');

    choice.toggleBurgerMenu(burgerIcon);

    expect(burgerIcon.classList).not.toContain('burger-menu__icon_open');
  });
});
