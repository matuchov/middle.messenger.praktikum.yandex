import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const API_WS_URL: string = import.meta.env.VITE_API_WS_URL;

export class ChatApi {
  private authAPIInstance: HTTPTransport;

  constructor() {
    this.authAPIInstance = new HTTPTransport();
  }

  async getToken(id: number): Promise<{ token: number }> {
    if (id) {
      return this.authAPIInstance.post(`${API_URL}/chats/token/${id}`, {});
    }
    throw new Error('Выберите чат');
  }

  openSocket(userId: number, chatId: number, token: string): WebSocket {
    console.log(`Connecting to: ${API_WS_URL}/chats/${userId}/${chatId}/${token}`);
    return new WebSocket(`${API_WS_URL}/chats/${userId}/${chatId}/${token}`);
  }
  getChatUsers(id: number) {
    return this.authAPIInstance.get(`${API_URL}/chats/${id}/users`, {});
  }

  async addUser(chatId: number, userID: number) {
    return this.authAPIInstance.put(API_URL + '/chats/users', {
      data: {
        users: [userID],
        chatId: chatId,
      },
    });
  }
  async deleteUser(chatId: number, userID: number) {
    return this.authAPIInstance.delete(API_URL + '/chats/users', {
      data: {
        users: [userID],
        chatId: chatId,
      },
    });
  }
}
