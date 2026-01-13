import store, { StoreEvents } from '@/app/store/store';
import type { IStore } from '@/app/store/storeType';
import type { Block, defaultProps } from '@/app/utils/Block';

type BlockClass<P extends defaultProps> = abstract new (...args: any[]) => Block<P>;

export function connect<P extends defaultProps, C extends BlockClass<P>>(
  Component: C,
  mapStateToProps: (state: IStore) => Partial<P>
): C {
  abstract class Connected extends Component {
    constructor(...args: any[]) {
      const props = args[0] as P;

      super({
        ...props,
        ...mapStateToProps(store.getState()),
      });

      store.on(StoreEvents.Updated, () => {
        this.setProps(mapStateToProps(store.getState()));
      });
    }
  }

  return Connected as C;
}
