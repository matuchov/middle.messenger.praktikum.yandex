import { ErrorPage } from '@/pages/ErrorPage';
import { routes } from './routes';

export function handleRoute() {
  let el;
  const path = window.location.pathname;

  if (routes[path]) {
    el = routes[path];
  }
  // } else {
  //   el = ErrorPage({ error: '404' });
  // }

  document.querySelector<HTMLDivElement>('#app')!.appendChild(el()!);
}
