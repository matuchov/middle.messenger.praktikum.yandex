import { ErrorPage } from '@/pages/ErrorPage';
import { routes } from './routes';

export function handleRoute() {
  let el;
  const path = window.location.pathname;

  if (routes[path]) {
    el = routes[path];
  } else {
    el = () => new ErrorPage({ error: '404' }).getContent()!;
  }

  document.querySelector<HTMLDivElement>('#app')!.appendChild(el());
}
