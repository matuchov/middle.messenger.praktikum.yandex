import { Profile } from '@/pages/Profile';
import { Auth } from '@/pages/Auth';
import { ChatPage } from '@/pages/ChatPage';
import { AvatarUpload } from '@/pages/AvatarUpload';
import { ErrorPage } from '@/pages/ErrorPage';

export const routes: Record<string, HTMLElement | DocumentFragment> = {
  // '/': () => ChatPage(),
  '/login': new Auth({ page: 'login' }).getContent()!,
  '/registration': new Auth({ page: 'registration' }).getContent()!,

  // '/profile': () => Profile({ page: 'default' }),
  // '/changepass': () => Profile({ page: 'changepass' }),
  // '/edit': () => Profile({ page: 'edit' }),
  // '/login': () => Auth({ page: 'login' }),
  // '/registration': () => Auth({ page: 'registration' }),
  // '/AvatarUpload': () => AvatarUpload(),
  // '/500': () => ErrorPage({ error: '500' }),
};
