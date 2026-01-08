import { Profile } from '@/pages/Profile';
import { Auth } from '@/pages/Auth';
import { ChatPage } from '@/pages/ChatPage';
import { AvatarUpload } from '@/pages/AvatarUpload';
import { ErrorPage } from '@/pages/ErrorPage';
import { SingIn } from '@/pages/SingIn';

export const routesConfig = [
  { pathname: '/messenger', block: ChatPage },
  { pathname: '/singin', block: SingIn },
  { pathname: '/registration', block: Auth },
  { pathname: '/profile', block: Profile },
  { pathname: '/changepass', block: Profile },
  { pathname: '/edit', block: Profile },
  { pathname: '/500', block: ErrorPage },
];
