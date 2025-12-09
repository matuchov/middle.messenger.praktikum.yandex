import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;

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
