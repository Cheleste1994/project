type EventListener<T> = (data: T) => void;

type EventTypes<T> = {
  [eventName: string]: EventListener<T>[];
};

class EventEmitter<T> {
  private events: EventTypes<T>;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, callback: EventListener<T>): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  public unsubscribe(eventName: string, callback: EventListener<T>): void {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      this.events[eventName] = eventCallbacks.filter((cb) => cb !== callback);
    }
  }

  public emit(eventName: string, data?: T): void {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => {
        if (data) {
          callback(data);
        } else {
          callback(undefined as T);
        }
      });
    }
  }
}

export default EventEmitter;
