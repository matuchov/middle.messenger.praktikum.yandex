import store, { StoreEvents } from '@/app/store/store';
import type { IStore } from '@/app/store/storeType';
import type { Block, defaultProps } from '@/app/utils/Block';

export function connect<const T extends defaultProps>(
  Component: typeof Block,
  mapStateToProps: (state: IStore) => IStore
) {
  // используем class expression
  return class extends Component<T> {
    constructor(props: T) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
