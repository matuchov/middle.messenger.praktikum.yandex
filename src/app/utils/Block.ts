import { EventBus } from './EventBus';

const EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_RENDER: 'flow:render',
  FLOW_CDU: 'flow:component-did-update',
};

type TEventBus<T> = {
  [EVENTS.INIT]: [];
  [EVENTS.FLOW_CDM]: [];
  [EVENTS.FLOW_RENDER]: [];
  [EVENTS.FLOW_CDU]: [oldProps: T, newProps: T];
};

type Tmeta = {
  tagName: string;
  props: unknown;
};

export class Block<TProps extends object> {
  private _element: HTMLElement | null = null;

  private _meta: Tmeta;

  protected props: TProps;

  protected childrens: [];

  private readonly _eventBus: EventBus<TEventBus<TProps>>;

  constructor(props: TProps, tagName = 'div') {
    const eventBus = new EventBus<TEventBus<TProps>>();
    this._meta = { tagName, props };
    this._eventBus = eventBus;
    this.props = this._makePropsProxy(props);
    this._registerEvents(eventBus);
    this.childrens = [];
    eventBus.emit(EVENTS.INIT);
    eventBus.emit(EVENTS.FLOW_RENDER);
  }

  private _registerEvents(eventBus: EventBus<TEventBus<TProps>>) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = document.createElement(tagName);
  }

  protected init() {
    this._createResources();
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount(oldProps?: TProps) {}

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    this.componentDidUpdate(oldProps, newProps);
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  setProps(nextProps: Partial<TProps>) {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  // _applyBindings(value) {
  //   Object.keys(this._bindings).forEach((key) => {
  //     this._bindings[key][value]?.forEach(fn => {

  //     })
  //   });
  // }

  get element() {
    return this._element;
  }

  private _render() {
    const rendered = this.render();
    if (this._element) this._element = rendered.el;
    this.bindings = rendered.bindings;

    Object.keys(this.props).forEach((prop) => {
      this.bindings.setProps[prop]?.forEach((fn) => {
        fn(this.props[prop]);
      });
      this.bindings.setChildrens[prop]?.forEach((fn) => {
        fn(this.props[prop]);
      });
    });
  }

  protected render(): {
    el: HTMLElement;
    bindings: {
      setProps: Record<string, ((value: string) => void)[]>;
      setChildrens: Record<string, ((value: HTMLElement) => void)[]>;
    };
  } {
    return { el: document.createElement('div'), bindings: { setProps: {}, setChildrens: {} } };
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: TProps): TProps {
    return new Proxy(props, {
      get: (target, prop, receiver) => {
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value) => {
        if (typeof prop !== 'string') return false;
        const key = prop as keyof TProps;
        const oldValue = target[key];
        if (oldValue !== value) {
          const oldProps = { ...target };
          const success = Reflect.set(target, key, value);

          if (success) {
            this._eventBus.emit(EVENTS.FLOW_CDU, oldProps, target);
          }
          return success;
        }

        return true;
      },
    });
  }

  show() {
    const el = this.getContent();
    if (el) el.style.display = 'block';
  }

  hide() {
    const el = this.getContent();
    if (el) el.style.display = 'none';
  }
}
