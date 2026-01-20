import { EventBus } from '../utils/shared/EventBus';
import type { IStore } from './storeType';

export const StoreEvents = {
  Updated: 'updated',
} as const;

export class Store extends EventBus<Record<string, unknown[]>> {
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
  }

  public clean() {
    this.state = {};
  }
}

export default new Store();
