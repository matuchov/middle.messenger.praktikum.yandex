import { ErrorPage } from '@/pages/ErrorPage';
import { routes } from './routes';
import { SessionApi } from '@/entities/Session/api/SessionApi';
import { SessionController } from '@/entities/Session';
import store from '../store/store';

const session = new SessionController();

const handleRoute = (href: string) => {
  let el;
  if (routes[href]) {
    el = routes[href];
  } else {
    el = () => new ErrorPage({ error: '404' }).getContent()!;
  }

  document.querySelector<HTMLDivElement>('#app')!.replaceChildren(el());
};

export const init = () => {
  document.addEventListener('click', (event) => {
    const target = event?.target;
    let link;
    if (target instanceof HTMLElement) link = target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (link.origin !== window.location.origin) return;
    event.preventDefault();
    window.history.pushState({}, '', href);
    handleRoute(href);
  });
  session.getUser().finally(() => {
    console.log(store.getState());
    handleRoute(window.location.pathname);
  });
};
