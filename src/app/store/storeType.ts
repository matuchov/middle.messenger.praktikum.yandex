import type { IChatlistResponce } from '@/features/Chatlist/model/types';

export interface IStore {
  user?: string | null;
  chatList: IChatlistResponce[];
}
