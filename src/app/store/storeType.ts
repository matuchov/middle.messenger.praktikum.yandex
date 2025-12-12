import { messages } from './../../widgets/Chat/ui/ChatMessages/model/messages';
import type { IChatlistResponce } from '@/features/Chatlist/model/types';

export interface IStore {
  user?: string | null;
  chatlist?: IChatlistResponce[] | null;
  curentChatId?: number | null;
  messages?: resMessage[];
}

export interface resMessage {
  chat_id: number;
  content: string;
  file: null;
  id: 1;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}
