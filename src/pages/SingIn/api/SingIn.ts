import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const authAPIInstance = new HTTPTransport();

export class SingInApi {
  singin(data: Record<string, unknown>) {
    return authAPIInstance.post(API_URL + '/auth/signin', { data });
  }
}
