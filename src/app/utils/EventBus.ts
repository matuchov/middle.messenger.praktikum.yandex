

export class EventBus<T> {
  private listeners: { [K in keyof T]?: ((data?: T[K]) => void)[] } = {};

  on<K extends keyof T>(event: K, callback: (arg?: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off<K extends keyof T>(event: K, callback: (arg?: T[K]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${String(event)}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit<K extends keyof T>(event: K, data?: T[K]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${String(event)}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(data);
    });
  }
}
