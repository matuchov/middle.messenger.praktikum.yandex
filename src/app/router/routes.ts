import { Profile } from '@/widgets/Profile';
import { ChatPage } from '@/pages/ChatPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';

export const routesConfig = [
  { pathname: '/messenger', block: ChatPage },
  { pathname: '/', block: Login },
  { pathname: '/registration', block: Registration },
  { pathname: '/profile', block: Profile },
  { pathname: '/changepass', block: Profile },
  { pathname: '/edit', block: Profile },
  { pathname: '/500', block: ErrorPage },
];
