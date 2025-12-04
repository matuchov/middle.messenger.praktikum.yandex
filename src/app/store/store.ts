import { EventBus } from '../utils/EventBus';

export const StoreEvents = {
  Updated: 'updated',
} as const;

class Store extends EventBus<Record<string, unknown[]>> {
  private state: Record<string, unknown> = {};

  public set(value: unknown) {
    Object.assign(this.state, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
