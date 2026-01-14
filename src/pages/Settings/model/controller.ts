import store from '@/app/store/store';
import { SettingsApi } from '../api/SettingsApi';
import { router } from '@/app/router/router';

const settingsApi = new SettingsApi();

export class SettingsController {
  public changeUser(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form));

    const res = settingsApi.changeUser(data);

    res.then((res) => {
      const user = JSON.parse(res as string);
      if (Object.hasOwn(user, 'id')) {
        store.set({ user, isProfileEdit: false });
      }
      router.go('/settings');
    });
    return res;
  }

  public setEdit() {
    store.set({ isProfileEdit: true });
  }
}
