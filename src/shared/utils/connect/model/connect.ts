import store, { StoreEvents } from '@/app/store/store';
import type { IStore } from '@/app/store/storeType';
import type { Block, defaultProps } from '@/app/utils/Block';

type BlockClass<T extends defaultProps> = new (props: T) => Block<T>;

export function connect<T extends defaultProps>(
  Component: BlockClass<T>,
  mapStateToProps: (state: IStore) => Partial<T>
) {
  return class extends Component {
    constructor(props: T) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
