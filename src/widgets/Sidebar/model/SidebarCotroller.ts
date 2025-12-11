import store from '@/app/store/store';
import { SidebarAPI } from '../api/SidebarApi';

const sidebarAPI = new SidebarAPI();

export class SidebarController {
  public createChat(title: string) {
    const res = sidebarAPI.createChat({ title: title });

    res.then((res) => {
      const chatId = JSON.parse(res as string);
      if (Object.hasOwn(chatId, 'id')) {
        store.set({ curentChatId: chatId });
      }
    });
    return res;
  }
  addUser() {
    store.getState().chatlist?.forEach((chat) => {
      sidebarAPI.addUser(chat.id);
    });
  }
}
