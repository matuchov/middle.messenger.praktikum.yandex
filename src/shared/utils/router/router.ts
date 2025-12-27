import type { Block, defaultProps } from '@/app/utils/Block';

interface BlockConstructable {
  new (): Block<defaultProps>;
}

interface RouteProps {
  rootQuery: string;
}

class Route {
  private _pathname: string;
  private _blockClass: BlockConstructable;
  private _block: Block<defaultProps> | null;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockConstructable, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.destroy();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      const root = document.querySelector(this._props.rootQuery);
      root!.replaceChildren(this._block.getContent()!);
      return;
    }
  }
}

export class Router {
  private static __instance: Router | null = null;

  public routes: Route[] = [];
  public history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = 'app';

  constructor(rootQuery: string = 'app') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructable): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
