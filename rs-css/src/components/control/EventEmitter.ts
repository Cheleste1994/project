type EventListener = (data: boolean | string) => void;

class EventEmitter {
  private events: { [eventName: string]: EventListener[] };

  constructor() {
    this.events = {};
  }

  public subscribe(event: string, callback: EventListener): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  public unsubscribe(event: string, callback: EventListener): void {
    this.events[event] = this.events[event].filter((eventFn) => callback !== eventFn);
  }

  public emit(event: string, data: boolean | string): void {
    const eventCallbacks = this.events[event];
    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => {
        callback.call(this, data);
      });
    }
  }
}

export default EventEmitter;
