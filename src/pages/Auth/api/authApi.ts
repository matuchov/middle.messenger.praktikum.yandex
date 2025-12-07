import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const authAPIInstance = new HTTPTransport();

export class AuthAPI {
  singup(data: Record<string, unknown>) {
    return authAPIInstance.post(API_URL + '/auth/signup', { data });
  }

  singin(data: Record<string, unknown>) {
    return authAPIInstance.post(API_URL + '/auth/signin', { data });
  }
}
