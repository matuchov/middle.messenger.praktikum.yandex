import { errorStringify } from '@/shared/utils/errors/errors';
import { AvatarUploadApi } from './AvatarUploadApi';
import store from '@/app/store/store';
import type { Iuser } from '@/widgets/Profile';
import { router } from '@/app/router/router';
import { setFormError } from '@/shared/utils/errors/setFormError';

const api = new AvatarUploadApi();

export class AvatarUploadController {
  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(form);
    const file = data.avatar as File;
    const error = this.validate(file);

    if (error) {
      setFormError(error, 'avatar');
    } else {
      this.upload(form);
    }
  }

  public async upload(data: FormData) {
    try {
      await api.uploadAvatar(data);
      if (typeof data === 'string') {
        const user: Iuser = JSON.parse(data);
        store.set({
          user,
        });
      }
      router.go('/settings');
    } catch (e) {
      const error = errorStringify(e);
      setFormError(error, 'avatar');
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
