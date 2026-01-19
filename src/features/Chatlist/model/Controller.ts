import store from '@/app/store/store';

export class ChatlisController {
  public setCurentChat(chatId: number) {
    store.set({ curentChatId: chatId });
  }
}
