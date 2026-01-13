import store from '@/app/store/store';
import { ChatApi } from '../ChatApi/ChatApi';

const chatApi = new ChatApi();

class ChatController {
  socket: WebSocket | null = null;
  private pingInterval: ReturnType<typeof setInterval> | null = null;

  public async openSocket(chatId?: number | null) {
    store.set({ isChatLoading: true });
    const userId = store.getState().user?.id;

    if (!userId || !chatId) {
      throw new Error('Недостаточно данных для открытия сокета');
    }

    try {
      console.log(chatId);

      const res = await chatApi.getToken(chatId);
      const token = typeof res === 'string' ? JSON.parse(res).token : res.token;
      this.getChatUsers(chatId);
      if (this.socket) {
        this.socket.close();
      }

      this.socket = chatApi.openSocket(userId, chatId, token);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        store.set({ isChatLoading: false });
        this.getMessages();
        this.setupPing();
      };

      this.socket.onmessage = (event) => {
        this.handleIncomingMessage(event.data);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket closed', event);
        this.cleanupPing();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (e) {
      console.error('Ошибка при открытии сокета:', e);
    }
  }

  private handleIncomingMessage(data: string) {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData.type === 'pong' || parsedData.type === 'user connected') {
        return;
      }

      if (Array.isArray(parsedData)) {
        store.set({ messages: parsedData });
      } else if (parsedData.type === 'message') {
        const currentMessages = store.getState().messages || [];
        store.set({ messages: [parsedData, ...currentMessages] });
      }

      console.log('Получено сообщение:', parsedData);
    } catch (e) {
      console.error('Ошибка парсинга сообщения:', e);
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        })
      );
    } else {
      console.error('Сокет не открыт или закрыт');
    }
  }

  getMessages(offset: string = '0') {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: offset,
          type: 'get old',
        })
      );
    }
  }

  clearMessages() {
    store.set({ messages: [] });
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
  }

  private cleanupPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
  getChatUsers(id: number) {
    chatApi
      .getChatUsers(id)
      .then((res) => {
        const users = JSON.parse(res as string);
        if (Array.isArray(users)) {
          store.set({ chatUsers: users });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async addUser(e: SubmitEvent) {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const data = Object.fromEntries(new FormData(e.target));
      const userId = +data?.addUser;
      const chatId = store.getState().curentChatId;

      if (!chatId || !userId) return;
      await chatApi.addUser(chatId, userId);
      this.getChatUsers(chatId);
    }
  }

  public async deleteUser(chatId: number, userId: number) {
    await chatApi.deleteUser(chatId, userId);
    this.getChatUsers(chatId);
  }
}

export default new ChatController();
