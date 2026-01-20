import { HTTPTransport } from '@/app/utils/HTTPTransport/HTTPtransport';

import { API_URL } from '@/shared/utils/api/consts';

export class SidebarAPI {
  api;
  constructor() {
    this.api = new HTTPTransport();
  }
  createChat(data: { title: string }) {
    const res = this.api.post(API_URL + '/chats', { data });
    return res;
  }
  addUser(chatId: number) {
    this.api.put(API_URL + '/chats/users', {
      data: {
        users: [5269],
        chatId: chatId,
      },
    });
  }
}
