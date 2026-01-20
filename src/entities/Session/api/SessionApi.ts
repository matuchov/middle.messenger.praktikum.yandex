import { HTTPTransport } from '@/app/utils/HTTPTransport/HTTPtransport';

import { API_URL } from '@/shared/utils/api/consts';

export class SessionApi {
  authAPIInstance;
  constructor() {
    this.authAPIInstance = new HTTPTransport();
  }
  getUser() {
    const res = this.authAPIInstance.get(API_URL + '/auth/user', {});
    return res;
  }
  async logout() {
    return this.authAPIInstance.post(API_URL + '/auth/logout', {});
  }
}
