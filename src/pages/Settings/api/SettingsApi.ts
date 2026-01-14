import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;

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
