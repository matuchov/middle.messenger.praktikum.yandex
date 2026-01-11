import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const authAPIInstance = new HTTPTransport();

export class RegistrationApi {
  signup(data: Record<string, unknown>) {
    return authAPIInstance.post(API_URL + '/auth/signup', { data });
  }
}
