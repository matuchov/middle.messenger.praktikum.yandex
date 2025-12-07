import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;

export class SessionApi {
  authAPIInstance;
  constructor() {
    this.authAPIInstance = new HTTPTransport();
  }
  getUser() {
    const res = this.authAPIInstance.get(API_URL + '/auth/user', {});

    return res;
  }
  logout() {
    return this.authAPIInstance.post(API_URL + '/auth/logout', {});
  }
}
