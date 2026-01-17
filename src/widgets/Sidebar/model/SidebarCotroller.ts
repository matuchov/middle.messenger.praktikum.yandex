import store from '@/app/store/store';
import { SidebarAPI } from '../api/SidebarApi';
import { errorStringify } from '@/shared/utils/errors/errors';
import { setFormError } from '@/shared/utils/errors/setFormError';
import { validate, validators } from '@/shared/utils/validation/Validate';

const sidebarAPI = new SidebarAPI();

export class SidebarController {
  public async createChat(e: SubmitEvent) {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const data = Object.fromEntries(new FormData(e.target));
      const title = data?.createChat.toString();
      const error = validate([validators.required()], title);
      if (error) {
        setFormError(error, 'createChat', 5000);
        return;
      }

      try {
        const res = await sidebarAPI.createChat({ title });
        const chatId = JSON.parse(res as string);

        if (Object.hasOwn(chatId, 'id')) {
          store.set({ curentChatId: chatId.id });
        }
      } catch (e) {
        const error = errorStringify(e);
        setFormError(error, 'createChat', 5000);
      }
    }
  }
}
