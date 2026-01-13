import store from '@/app/store/store';
import { ChatlistApi } from '../api/ChatlistApi';
import type { IChatlistResponce } from './types';

const chatlistAPI = new ChatlistApi();

export class ChatlisController {
  public getChats() {
    const res = chatlistAPI.getChats();

    res.then((res) => {
      const chatlist: IChatlistResponce[] = JSON.parse(res as string);

      if (Array.isArray(chatlist)) {
        store.set({ chatlist });
      } else {
        store.set({ chatlist: null });
      }
    });
    return res;
  }
  public setCurentChat(chatId: number) {
    store.set({ curentChatId: chatId });
  }
}
