import { HTTPTransport } from '@/app/utils/HTTPtransport';

import { API_URL } from '@/shared/utils/api/consts';
const authAPIInstance = new HTTPTransport();

export class RegistrationApi {
  signup(data: Record<string, unknown>) {
    return authAPIInstance.post(API_URL + '/auth/signup', { data });
  }
}
