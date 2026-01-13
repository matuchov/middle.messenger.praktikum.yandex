import { Profile } from '@/widgets/Profile';
import { ChatPage } from '@/pages/ChatPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { Login } from '@/pages/Login';
import { Registration } from '@/pages/Registration';
import { Settings } from '@/pages/Settings';
import { AvatarUpload } from '@/pages/AvatarUpload';

export const routesConfig = [
  { pathname: '/messenger', block: ChatPage },
  { pathname: '/', block: Login },
  { pathname: '/registration', block: Registration },
  { pathname: '/AvatarUpload', block: AvatarUpload },
  { pathname: '/changepass', block: Profile },
  { pathname: '/settings', block: Settings },
  { pathname: '/500', block: ErrorPage },
];
