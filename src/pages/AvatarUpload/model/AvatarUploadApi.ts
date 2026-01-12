import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const authAPIInstance = new HTTPTransport();

export class AvatarUploadApi {
  uploadAvatar(data: FormData) {
    return authAPIInstance.put(API_URL + '/user/profile/avatar', { data });
  }
}
