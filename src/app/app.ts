import { Profile } from '@/pages/Profile';
import { Auth } from '@/pages/Auth';
import { ChatPage } from '@/pages/ChatPage';
import { AvatarUpload } from '@/pages/AvatarUpload';
import { ErrorPage } from '../pages/ErrorPage';

const routes: Record<string, () => string> = {
  '/': () => ChatPage(),
  '/profile': () => Profile({ page: 'default' }),
  '/changepass': () => Profile({ page: 'changepass' }),
  '/edit': () => Profile({ page: 'edit' }),
  '/login': () => Auth({ page: 'login' }),
  '/registration': () => Auth({ page: 'registration' }),
  '/AvatarUpload': () => AvatarUpload(),
  '/500': () => ErrorPage({ error: '500' }),
};

function handleRoute() {
  let el;
  const path = window.location.pathname;

  if (routes[path]) {
    el = routes[path]();
  } else {
    el = ErrorPage({ error: '404' });
  }

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = el;
}

window.addEventListener('load', handleRoute);
