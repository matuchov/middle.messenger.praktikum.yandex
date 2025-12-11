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

export type defaultProps = {
  events?: Partial<{
    [K in keyof HTMLElementEventMap]: {
      listener: (e: HTMLElementEventMap[K]) => void;
      useCapture?: boolean;
    };
  }>;
};

export class Block<TProps extends defaultProps> {
  private _element: HTMLElement | DocumentFragment | null | undefined = null;

  renderFlag = true;

  public children: Partial<TProps>;

  private _meta: Tmeta;

  props: TProps;

  private readonly _eventBus: EventBus<TEventBus<TProps>>;

  constructor(propsAndChildren: TProps, tagName = 'div') {
    const { children, props } = this._getChildren(propsAndChildren);

    const eventBus = new EventBus<TEventBus<TProps>>();

    this.children = children;
    this._meta = { tagName, props };
    this._eventBus = eventBus;
    this.props = this._makePropsProxy(props);
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

  private _getChildren(propsAndChildren: TProps): {
    children: Partial<TProps>;
    props: TProps;
  } {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children: children as Partial<TProps>, props: props as TProps };
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount(oldProps?: TProps) {
    return oldProps;
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    this.componentDidUpdate(oldProps, newProps);

    this._eventBus.emit(EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (oldProps !== newProps) {
      return true;
    }
    return false;
  }

  private _addEvents() {
    const { events = {} } = this.props;

    (Object.keys(events) as (keyof typeof events)[]).forEach((eventName) => {
      this._element?.addEventListener(
        eventName,
        events[eventName]?.listener as EventListener,
        events[eventName]?.useCapture || false
      );
    });
  }

  setProps(nextProps: Partial<TProps>) {
    console.log(nextProps);

    if (!nextProps) return;

    const { children, props } = this._getChildren(nextProps as TProps);

    if (Object.keys(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.keys(props).length) {
      const oldProps = { ...this.props };

      this.renderFlag = true;
      Object.assign(this.props, props);
      this.renderFlag = false;

      this._eventBus.emit(EVENTS.FLOW_CDU, oldProps, this.props);
    } else if (Object.keys(children).length) {
      this._eventBus.emit(EVENTS.FLOW_CDU, { ...this.props }, this.props);
    }
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    const newElement =
      block instanceof DocumentFragment ? (block.firstElementChild as HTMLElement) : block;
    if (this._element && this._element.parentNode) {
      this._element.parentNode?.replaceChild(block, this._element);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected render(): HTMLElement | DocumentFragment {
    return document.createElement('div');
  }

  getContent() {
    return this._element;
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

          if (success && !this.renderFlag) {
            this._eventBus.emit(EVENTS.FLOW_CDU, oldProps, target);
          }
          return success;
        }

        return true;
      },
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    if (!this._element) return;

    Object.entries(events).forEach(([eventName, config]) => {
      if (!config) return;

      const { listener, useCapture } = config;

      if (!listener) return;

      this._element!.removeEventListener(eventName, listener as EventListener, useCapture);
    });
  }

  public destroy() {
    this._removeEvents();
    if (this._element && this._element instanceof Element) {
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
