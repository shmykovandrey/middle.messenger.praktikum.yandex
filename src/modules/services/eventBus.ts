type Listeners = {
  [index: string]: string[];
};

export interface IEventBus {
  listneners: Listeners;
  on: (event: string, callback: () => void) => void;
  emit: (event: string, [number]) => void;
  off: (event: string, callback: () => void) => void;
}

export default class EventBus implements IEventBus {
  listneners = {};

  constructor() {
    this.listneners = [];
  }

  on(event, callback) {
    if (!this.listneners[event]) {
      this.listneners[event] = [];
    }
    this.listneners[event].push(callback);
  }

  emit(event, ...args) {
    if (!this.listneners[event]) {
      throw new Error(`Нет такого эвента ${event}`);
    }
    this.listneners[event].forEach((listener) => listener(...args));
  }

  off(event, callback) {
    if (!this.listneners[event]) {
      throw new Error(`Нет такого эвента ${event}`);
    }

    this.listneners[event].filter((listener) => listener !== callback);
  }
}
