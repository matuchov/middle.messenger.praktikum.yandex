import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const API_WS_URL: string = import.meta.env.VITE_API_WS_URL;

export class ChatApi {
  private authAPIInstance: HTTPTransport;

  constructor() {
    this.authAPIInstance = new HTTPTransport();
  }

  async getToken(id: number): Promise<any> {
    if (id) {
      return this.authAPIInstance.post(`${API_URL}/chats/token/${id}`, {});
    }
    throw new Error('Выберите чат');
  }

  openSocket(userId: number, chatId: number, token: string): WebSocket {
    console.log(`Connecting to: ${API_WS_URL}/chats/${userId}/${chatId}/${token}`);
    return new WebSocket(`${API_WS_URL}/chats/${userId}/${chatId}/${token}`);
  }
}
