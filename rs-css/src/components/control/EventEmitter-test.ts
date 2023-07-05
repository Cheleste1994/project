import { EventData } from '../../assets/data/interface';
import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  let emmiter: EventEmitter<EventData>;
  beforeEach(() => {
    emmiter = new EventEmitter();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('должен создаться экземпляр EventEmitter', () => {
    expect(emmiter).toBeInstanceOf(EventEmitter);
  });
  it('должен содержать метод subscribe', () => {
    expect(emmiter.subscribe).toBeInstanceOf(Function);
  });
  it('должен содержать метод emit', () => {
    expect(emmiter.emit).toBeInstanceOf(Function);
  });
  it('должен вызывать зарегистрированные обработчики при вызове функции emit', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const events = ['help', 'changeHoverLineEditHTML', 'changeHoverELementTable'];
    const eventData = {
      element: document.createElement('div'),
      isAdd: false,
      index: 2,
    };
    events.forEach((event) => {
      emmiter.subscribe(event, handler1);
      emmiter.subscribe(event, handler2);
    });
    events.forEach((event) => {
      emmiter.emit(event, eventData);
    });
    expect(handler1).toHaveBeenCalledWith(eventData);
    expect(handler2).toHaveBeenCalledWith(eventData);
  });
});
