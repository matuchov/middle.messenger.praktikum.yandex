import { HTTPTransport } from '@/app/utils/HTTPtransport';

import { API_URL } from '@/shared/utils/api/consts';

export class SettingsApi {
  api;
  constructor() {
    this.api = new HTTPTransport();
  }
  changeUser(data: Record<string, unknown>) {
    const res = this.api.put(API_URL + '/user/profile', { data });
    return res;
  }
}
