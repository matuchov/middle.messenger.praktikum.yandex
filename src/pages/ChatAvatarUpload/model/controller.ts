import { errorStringify } from '@/shared/utils/errors/errors';
import { ChatAvatarUploadApi } from './AvatarUploadApi';
import store from '@/app/store/store';
import { router } from '@/app/router/router';
import { setFormError } from '@/shared/utils/errors/setFormError';

const api = new ChatAvatarUploadApi();

export class AvatarUploadController {
  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const chatId = store.getState().curentChatId?.toString();
    if (!chatId) {
      setFormError('Не выбран чат', 'chatAvatar');
      return;
    }
    form.append('chatId', chatId);

    const data = Object.fromEntries(form);
    const file = data.avatar as File;
    const error = this.validate(file);

    if (error) {
      setFormError(error, 'chatAvatar');
    } else {
      this.upload(form);
    }
  }

  public async upload(data: FormData) {
    try {
      await api.uploadAvatar(data);
      router.go('/messenger');
    } catch (e) {
      const error = errorStringify(e);
      setFormError(error, 'chatAvatar');
    }
  }

  validate(file: File): string {
    if (file.size === 0) {
      return 'Выберите файл';
    }
    if (!this.isAllowedExtension(file.name)) {
      return 'Поддерживаются только JPEG, JPG, PNG, GIF, WebP';
    }
    return '';
  }

  isAllowedExtension(fileName: string): boolean {
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? allowedExtensions.includes(extension) : false;
  }
}
