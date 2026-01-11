import { Profile } from '@/widgets/Profile';
import { ChatPage } from '@/pages/ChatPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';
import { Settings } from '@/pages/Settings';

export const routesConfig = [
  { pathname: '/messenger', block: ChatPage },
  { pathname: '/', block: Login },
  { pathname: '/registration', block: Registration },
  { pathname: '/profile', block: Profile },
  { pathname: '/changepass', block: Profile },
  { pathname: '/settings', block: Settings },
  { pathname: '/500', block: ErrorPage },
];
