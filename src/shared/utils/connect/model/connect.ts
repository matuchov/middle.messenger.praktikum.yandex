import store, { StoreEvents } from '@/app/store/store';
import type { IStore } from '@/app/store/storeType';
import type { Block, defaultProps } from '@/app/utils/Block';

type BlockClass<P extends defaultProps> = new (...args: any[]) => Block<P>;

export function connect<P extends defaultProps>(
  Component: BlockClass<P>,
  mapStateToProps: (state: IStore) => Partial<P>
) {
  // Мы возвращаем анонимный класс.
  // TS сам выведет P из Component, если мы не будем перебивать его вторым дженериком C.
  return class extends (Component as any) {
    constructor(props: P) {
      // Используем P напрямую вместо args: any[]
      super({
        ...props,
        ...mapStateToProps(store.getState()),
      });

      store.on(StoreEvents.Updated, () => {
        // Здесь Partial<P> гарантирует, что мы обновляем только нужные поля
        this.setProps(mapStateToProps(store.getState()));
      });
    }
  } as BlockClass<P>;
}
