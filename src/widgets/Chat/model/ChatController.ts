import { errorStringify } from '@/shared/utils/errors/errors';
import store from '@/app/store/store';
import { ChatApi } from '../ChatApi/ChatApi';
import type { IChatlistResponce } from '@/features/Chatlist/model/types';
import { setFormError } from '@/shared/utils/errors/setFormError';

const chatApi = new ChatApi();

class ChatController {
  currenChatId: number | null | undefined = null;
  socket: WebSocket | null = null;
  private pingInterval: ReturnType<typeof setInterval> | null = null;

  public async openSocket(chatId?: number | null) {
    if (this.currenChatId === chatId) {
      return;
    }
    this.currenChatId = chatId;
    store.set({ isChatLoading: true });
    const userId = store.getState().user?.id;
    if (!userId || !chatId) {
      return;
    }

    const res = await chatApi.getToken(chatId);
    const token = typeof res === 'string' ? JSON.parse(res).token : res.token;
    this.getChatUsers(chatId);
    if (this.socket) {
      this.socket.close();
    }

    this.socket = chatApi.openSocket(userId, chatId, token);

    this.socket.onopen = () => {
      store.set({ isChatLoading: false });
      this.getMessages();
      this.setupPing();
    };

    this.socket.onmessage = (event) => {
      this.handleIncomingMessage(event.data);
    };

    this.socket.onclose = () => {
      this.cleanupPing();
    };
  }

  private handleIncomingMessage(data: string) {
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
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        })
      );
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
  async getChatUsers(id: number) {
    try {
      const res = await chatApi.getChatUsers(id);
      const users = JSON.parse(res as string);
      if (Array.isArray(users)) {
        store.set({ chatUsers: users });
      }
    } catch (e) {
      store.set({ curentChatId: null });
      throw e;
    }
  }

  public async addUser(e: SubmitEvent) {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const data = Object.fromEntries(new FormData(e.target));
      const userId = +data?.addUser;
      const chatId = store.getState().curentChatId;

      if (!chatId || !userId) return;
      try {
        await chatApi.addUser(chatId, userId);
      } catch (e) {
        const error = errorStringify(e);
        setFormError(error, 'addUser', 5000);
      }
      this.getChatUsers(chatId);
    }
  }

  public async deleteUser(chatId: number, userId: number) {
    try {
      await chatApi.deleteUser(chatId, userId);
      await this.getChatUsers(chatId);
    } catch (e) {
      const error = errorStringify(e);
      setFormError(error, 'addUser', 5000);
    }
  }

  public async getChats() {
    try {
      const res = await chatApi.getChats();
      const chatlist: IChatlistResponce[] = JSON.parse(res as string);
      if (Array.isArray(chatlist)) {
        store.set({ chatlist });
      } else {
        store.set({ chatlist: null });
      }
      return res;
    } catch (e) {
      const error = errorStringify(e);
      setFormError(error, 'chatList');
    }
  }

  public setCurentChat(chatId: number) {
    store.set({ curentChatId: chatId });
  }
}

export default new ChatController();
