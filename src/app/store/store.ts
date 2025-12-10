import { EventBus } from '../utils/EventBus';
import type { IStore } from './storeType';

export const StoreEvents = {
  Updated: 'updated',
} as const;

class Store extends EventBus<Record<string, unknown[]>> {
  constructor() {
    super();
    this.on(StoreEvents.Updated, () => {});
  }

  private state: IStore = {};
  public getState() {
    return this.state;
  }

  public set(value: Partial<IStore>) {
    Object.assign(this.state, value);

    this.emit(StoreEvents.Updated);
    console.log(this.state);
  }
}

export default new Store();
