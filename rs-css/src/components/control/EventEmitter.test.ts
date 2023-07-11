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
  it('should call registered handlers when calling the emit function and check the number of calls', () => {
    const handler1 = jest.fn();
    const events = ['help', 'changeHoverLineEditHTML', 'changeHoverELementTable'];
    const eventData = {
      element: document.createElement('div'),
      isAdd: false,
      index: 2,
    };
    events.forEach((event) => {
      emmiter.subscribe(event, handler1);
    });
    events.forEach((event) => {
      emmiter.emit(event, eventData);
    });
    expect(handler1).toHaveBeenCalledTimes(3);
    expect(handler1).toHaveBeenCalledWith(eventData);
  });
});
