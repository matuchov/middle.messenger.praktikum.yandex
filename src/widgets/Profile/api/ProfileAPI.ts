import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;

export class ProfileAPI {
  api;
  constructor() {
    this.api = new HTTPTransport();
  }
  changeUser(data: {}) {
    const res = this.api.put(API_URL + '/user/profile', { data });
    return res;
  }
}
