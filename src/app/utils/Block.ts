import { EventBus } from './EventBus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
}

type TEventBus = {
  [EVENTS.INIT]: void;
  [EVENTS.FLOW_CDM]: void;
  [EVENTS.FLOW_RENDER]: void;
  [EVENTS.FLOW_CDU]: { oldProps: unknown; newProps: unknown };
};

type Tmeta = {
  tagName: string;
  props: unknown;
};

export class Block<TProps extends object> {
  private _element: HTMLElement | null = null;
  private _meta: Tmeta;
  protected props: TProps;
  private readonly _eventBus: EventBus<TEventBus>;

  constructor(tagName = 'div', props: TProps) {
    const eventBus = new EventBus<TEventBus>();
    this._meta = { tagName, props };
    this._eventBus = eventBus;
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
    eventBus.emit(EVENTS.FLOW_RENDER);
  }

  private _registerEvents(eventBus: EventBus<TEventBus>) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
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

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (this._element) this._element.innerHTML = block;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: TProps): TProps {
    const self = this;
    return new Proxy(props, {
      set(target, prop: keyof TProps, value) {
        const oldProps = { ...target };
        target[prop] = value;
        self._eventBus.emit(EVENTS.FLOW_CDU, { oldProps, newProps: target });
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


