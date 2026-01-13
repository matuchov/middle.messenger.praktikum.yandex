import store, { StoreEvents } from '@/app/store/store';
import type { IStore } from '@/app/store/storeType';
import type { Block, defaultProps } from '@/app/utils/Block';

type BlockClass<T extends defaultProps> = new (props: T) => Block<T>;
type Constructor<T> = new (...args: any[]) => T;

export function connect<P extends defaultProps>(
  Component: BlockClass<P>,
  mapStateToProps: (state: IStore) => Partial<P>
): BlockClass<P> {
  return class extends (Component as Constructor<any>) {
    constructor(props: P) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) } as Partial<P>);
      });
    }
  } as BlockClass<P>;
}
