import store from '@/app/store/store';
import { ChatlistApi } from '../api/ChatlistApi';
import type { IChatlistResponce } from './types';

const chatlistAPI = new ChatlistApi();

export class ChatlisController {
  public getChats() {
    const res = chatlistAPI.getChats();

    res.then((res) => {
      const chatList: IChatlistResponce[] = JSON.parse(res as string);

      if (Array.isArray(chatList)) {
        store.set({ chatList });
      } else {
        store.set({ chatList: null });
      }
    });
    return res;
  }
}
