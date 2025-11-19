import { EventBus } from './EventBus';

const EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_RENDER: 'flow:render',
  FLOW_CDU: 'flow:component-did-update',
} as const;

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

type Children = Record<string, Block<object> | Block<object>[]>;

export class Block<TProps extends object> {
  private _element: HTMLElement | null = null;

  public children: Children;

  private _meta: Tmeta;

  props: TProps & object;

  private _unnamedChildrens: Block<object>[];

  private readonly _eventBus: EventBus<TEventBus<TProps>>;

  constructor(propsAndChildren: TProps, tagName = 'div') {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus<TEventBus<TProps>>();
    this.children = children;
    this._meta = { tagName, props };
    this._eventBus = eventBus;
    this.props = this._makePropsProxy(props);
    this._unnamedChildrens = [];
    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<TEventBus<TProps>>) {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = document.createElement(tagName);
  }

  private _init() {
    this._createResources();
    this.init();
    this._eventBus.emit(EVENTS.FLOW_RENDER);
  }

  private _getChildren(propsAndChildren: TProps): { children: Children; props: TProps } {
    const children: Children = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as TProps };
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount(oldProps?: TProps) {}

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.FLOW_CDM);
  }

  protected compile(Item: typeof Block<object>, data: object | object[]) {
    if (Array.isArray(data)) {
      const container = new DocumentFragment();

      data.forEach((bl) => {
        const el = new Item({ ...bl });
        this._unnamedChildrens.push(el);
        container.append(el.getContent()!);
      });

      return container;
    }

    return new Item(data).getContent();
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    this.componentDidUpdate(oldProps, newProps);
    this._unnamedChildrens.forEach((child) => child.destroy());
    this._eventBus.emit(EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  setProps(nextProps: Partial<TProps>) {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (this._element && this._element.parentNode) {
      this._element.parentNode.replaceChild(block, this._element);
    }
    this._element = block;
  }

  protected render(): HTMLElement {
    return document.createElement('div');
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

  public destroy() {
    if (this._element) {
      this._element.remove();
    }
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => c.destroy());
      } else {
        child.destroy();
      }
    });
  }
}
