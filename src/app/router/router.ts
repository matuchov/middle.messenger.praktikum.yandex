import { ErrorPage } from '@/pages/ErrorPage';
import { routes } from './routes';
import { UserApi } from '@/entities/Session/api/SessionApi';

const userApi = new UserApi();

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
  userApi.getUser().finally(() => {
    handleRoute(window.location.pathname);
  });
};
