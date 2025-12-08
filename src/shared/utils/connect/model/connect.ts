import store from '@/app/store/store';
import type { Block } from '@/app/utils/Block';

function connect(Component: typeof Block) {
  // используем class expression
  return class extends Component<Record<string, unknown>> {
    constructor(...args) {
      super(...args);

      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...store.getState() });
      });
    }
  };
}
