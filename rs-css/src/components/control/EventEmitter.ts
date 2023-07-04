type EventListener = (data: boolean | string | { element: HTMLElement; isAdd: boolean; index: number }) => void;

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

  public emit(event: string, data?: boolean | string | { element: HTMLElement; isAdd: boolean; index: number }): void {
    const eventCallbacks = this.events[event];
    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => {
        if (data) {
          callback.call(this, data);
        } else {
          callback.call(this, '');
        }
      });
    }
  }
}

export default EventEmitter;
