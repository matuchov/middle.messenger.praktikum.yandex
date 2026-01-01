import { Profile } from '@/pages/Profile';
import { Auth } from '@/pages/Auth';
import { ChatPage } from '@/pages/ChatPage';
import { AvatarUpload } from '@/pages/AvatarUpload';
import { ErrorPage } from '@/pages/ErrorPage';

export const routesConfig = [
  { pathname: '/messenger', block: ChatPage },
  { pathname: '/login', block: Auth },
  { pathname: '/registration', block: Auth },
  { pathname: '/profile', block: Profile },
  { pathname: '/changepass', block: Profile },
  { pathname: '/edit', block: Profile },
  { pathname: '/500', block: ErrorPage },
];
