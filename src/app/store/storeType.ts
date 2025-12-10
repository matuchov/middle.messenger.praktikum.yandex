import type { IChatlistResponce } from '@/features/Chatlist/model/types';

export interface IStore {
  user?: string | null;
  chatlist?: IChatlistResponce[] | null;
  curentChatId?: number | null;
}
