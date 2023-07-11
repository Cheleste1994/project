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
  it('should create an instance of EventEmitter', () => {
    expect(emmiter).toBeInstanceOf(EventEmitter);
  });

  it('should have the subscribe method', () => {
    expect(emmiter.subscribe).toBeInstanceOf(Function);
  });

  it('should have the emit method', () => {
    expect(emmiter.emit).toBeInstanceOf(Function);
  });
  it('should invoke registered handlers when the emit function is called', () => {
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
