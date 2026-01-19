import { HTTPTransport } from '@/app/utils/HTTPtransport';

import { API_URL } from '@/shared/utils/api/consts';

export class ChatlistApi {
  authAPIInstance;
  constructor() {
    this.authAPIInstance = new HTTPTransport();
  }
  getChats() {
    const res = this.authAPIInstance.get(API_URL + '/chats', {});
    return res;
  }
}
