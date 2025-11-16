// core/Block.ts

import { EventBus } from './EventBus';
import { compileTemplate } from './compiler';

const EVENTS = {
  INIT: 'init',
  CDM: 'component-did-mount',
  RENDER: 'render',
  CDU: 'component-did-update',
};

export abstract class Block<TProps extends Record<string, any>> {
  private _element: HTMLElement | null = null;

  // 👉 хранение детей
  private _children: Map<string, Block<any>> = new Map();

  // 👉 хранение списков детей
  private _childrenLists: Record<string, Map<string, Block<any>>> = {};

  // 👉 привязки из compile()
  private _bindings: {
    setProps: Record<string, ((v: any) => void)[]>;
    setChildrens: Record<string, ((el: HTMLElement) => void)[]>;
  } = { setProps: {}, setChildrens: {} };

  protected props: TProps;

  private _eventBus: EventBus<any>;

  constructor(props: TProps) {
    this.props = this._makePropsProxy(props);
    this._eventBus = new EventBus();

    this._registerEvents();

    this._eventBus.emit(EVENTS.INIT);
    this._eventBus.emit(EVENTS.RENDER);
  }

  private _registerEvents() {
    this._eventBus.on(EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(EVENTS.RENDER, this._render.bind(this));
    this._eventBus.on(EVENTS.CDM, this._cdm.bind(this));
    this._eventBus.on(EVENTS.CDU, this._cdu.bind(this));
  }

  private _init() {
    this.init();
  }

  protected init() {}

  /** 🔥 compile(template, props) — вызывается из render() компонента */
  protected compile(template: string, props: any) {
    const { el, result } = compileTemplate(template);
    this._bindings = result;

    // начальная инициализация props
    Object.entries(props).forEach(([key, val]) => {
      result.setProps[key]?.forEach((fn) => fn(val));
    });

    return el;
  }

  private _render() {
    const rendered = this.render();

    // Если компонент вернул HTML элемент
    if (rendered instanceof HTMLElement) {
      this._element = rendered;
      return;
    }

    // Если вернул { el, result } — old API
    if (rendered.el) {
      this._element = rendered.el;
      this._bindings = rendered.result;
    }
  }

  protected abstract render(): HTMLElement | { el: HTMLElement; result: any };

  private _cdm() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  private _cdu(oldProps: TProps, newProps: TProps) {
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (needRerender) this._eventBus.emit(EVENTS.RENDER);
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.CDM);
  }

  get element() {
    return this._element;
  }

  // -----------------------------------------------------------------------------------
  // 🔥 CHILDREN MANAGEMENT
  // -----------------------------------------------------------------------------------

  /** Установка одиночного ребенка {{child}} */
  setChild(name: string, child: Block<any>) {
    this._children.set(name, child);

    const insertFns = this._bindings.setChildrens[name];
    if (insertFns) {
      insertFns.forEach((fn) => fn(child.element!));
      child.dispatchComponentDidMount();
    }
  }

  /** Установка списка детей {{{rows}}} */
  setChildrenList<T>(
    name: string,
    items: T[],
    keyFn: (item: T) => string,
    ComponentClass: new (props: T) => Block<any>
  ) {
    if (!this._childrenLists[name]) this._childrenLists[name] = new Map();

    const listMap = this._childrenLists[name];

    const newList = new Map<string, Block<any>>();

    items.forEach((item) => {
      const key = keyFn(item);

      let child = listMap.get(key);

      if (!child) {
        child = new ComponentClass(item);
      }

      newList.set(key, child);
    });

    // удаляем отсутствующих детей
    listMap.forEach((child, key) => {
      if (!newList.has(key)) {
        const el = child.element;
        if (el && el.parentNode) el.remove();
      }
    });

    // DOM вставка по порядку
    const insertFns = this._bindings.setChildrens[name];
    if (insertFns) {
      insertFns.forEach((placeholderFn) => {
        // Очищаем контейнер
        const parent = placeholderFn(null as any); // хак чтобы получить parent
        parent.innerHTML = '';

        newList.forEach((child) => {
          parent.appendChild(child.element!);
          child.dispatchComponentDidMount();
        });
      });
    }

    this._childrenLists[name] = newList;
  }

  // -----------------------------------------------------------------------------------
  // PROPS PROXY + bindings
  // -----------------------------------------------------------------------------------

  private _makePropsProxy(props: TProps): TProps {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        const oldValue = target[prop];
        if (oldValue === value) return true;

        const oldProps = { ...target };
        target[prop] = value;

        if (this._bindings.setProps[prop]) {
          this._bindings.setProps[prop].forEach((fn) => fn(value));
          return true;
        }

        this._eventBus.emit(EVENTS.CDU, oldProps, target);
        return true;
      },
    });
  }

  // -----------------------------------------------------------------------------------

  hide() {
    if (this._element) this._element.style.display = 'none';
  }

  show() {
    if (this._element) this._element.style.display = 'block';
  }
}
