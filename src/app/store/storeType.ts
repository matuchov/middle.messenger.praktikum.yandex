import type { IChatlistResponce } from '@/features/Chatlist/model/types';
import type { Iuser } from '@/widgets/Profile';

export interface IStore {
  user?: Iuser | null;
  chatlist?: IChatlistResponce[] | null;
  curentChatId?: number | null;
  messages?: IresMessage[];
  chatUsers?: IchatUser[];
  isChatLoading?: boolean;
  isChatlistLoading?: boolean;
  forms?: Record<string, form>;
  isProfileEdit?: boolean;
}

export interface IresMessage {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface IchatUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
}

interface form {
  error?: string;
  fileName?: string;
}
