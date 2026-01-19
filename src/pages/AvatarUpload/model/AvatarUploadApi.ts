import { HTTPTransport } from '@/app/utils/HTTPtransport';

import { API_URL } from '@/shared/utils/api/consts';
const authAPIInstance = new HTTPTransport();

export class AvatarUploadApi {
  async uploadAvatar(data: FormData) {
    return authAPIInstance.put(API_URL + '/user/profile/avatar', { data });
  }
}
