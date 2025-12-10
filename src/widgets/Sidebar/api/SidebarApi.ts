import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;

export class SidebarAPI {
  api;
  constructor() {
    this.api = new HTTPTransport();
  }
  createChat(data: { title: string }) {
    const res = this.api.post(API_URL + '/chats', { data });
    return res;
  }
}
