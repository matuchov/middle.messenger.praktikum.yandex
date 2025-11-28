import { Profile } from '@/pages/Profile';
import { Auth } from '@/pages/Auth';
import { ChatPage } from '@/pages/ChatPage';
import { AvatarUpload } from '@/pages/AvatarUpload';
import { ErrorPage } from '@/pages/ErrorPage';

export const routes: Record<string, () => HTMLElement | DocumentFragment> = {
  '/': () => new ChatPage({}).getContent()!,
  '/login': () => new Auth({ page: 'login' }).getContent()!,
  '/registration': () => new Auth({ page: 'registration' }).getContent()!,
  '/profile': () => new Profile({ page: 'default' }).getContent()!,
  '/changepass': () => new Profile({ page: 'changepass' }).getContent()!,
  '/edit': () => new Profile({ page: 'edit' }).getContent()!,
  '/500': () => new ErrorPage({ error: '500' }).getContent()!,

  // '/AvatarUpload': () => AvatarUpload(),
};
