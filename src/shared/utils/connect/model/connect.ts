/* eslint-disable @typescript-eslint/no-explicit-any */
import store, { StoreEvents } from '@/app/store/store';
import type { IStore } from '@/app/store/storeType';
import type { Block, defaultProps } from '@/app/utils/Block';

type BlockClass<P extends defaultProps> = new (...args: any[]) => Block<P>;

export function connect<P extends defaultProps>(
  Component: BlockClass<P>,
  mapStateToProps: (state: IStore) => Partial<P>
) {
  return class extends (Component as any) {
    constructor(props: P) {
      super({
        ...props,
        ...mapStateToProps(store.getState()),
      });

      store.on(StoreEvents.Updated, () => {
        this.setProps(mapStateToProps(store.getState()));
      });
    }
  } as BlockClass<P>;
}
