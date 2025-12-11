import store from '@/app/store/store';
import { HTTPTransport } from '@/app/utils/HTTPtransport';

const API_URL: string = import.meta.env.VITE_API_URL;
const API_WS_URL: string = import.meta.env.VITE_API_WS_URL;

export class ChatApi {
  authAPIInstance;
  socket: WebSocket | null = null;
  constructor() {
    this.authAPIInstance = new HTTPTransport();
  }
  async getToken(id: number) {
    if (id) {
      const res = this.authAPIInstance.post(API_URL + `/chats/token/${id}`, {});
      return res;
    }
    throw new Error('Выберите чат');
  }

  async openSocket(curentChatId: number): Promise<void> {
    const userId = store.getState().user?.id;
    if (!userId || !curentChatId) {
      throw new Error('Недостаточно данных для открытия сокета');
    }

    this.getToken(curentChatId).then((res) => {
      const token = JSON.parse(res as string).token;
      console.log(`${API_WS_URL}/chats/${userId}/${curentChatId}/${token}`);

      this.socket = new WebSocket(`${API_WS_URL}/chats/${userId}/${curentChatId}/${token}`);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.socket.onmessage = (event) => {
        this.handleIncomingMessage(event.data);
      };

      this.socket.onclose = () => {
        console.log('WebSocket closed');
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    });
  }
  handleIncomingMessage(data) {
    console.log(data);
  }

  sendMessage(message: string) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        })
      );
    }
  }
  getMessages() {
    const res = this.socket?.send(`{content: "string",type: "get old"}`);
    if (res) store.set({ messages: JSON.parse(res) });
    console.log(res);
  }
}
