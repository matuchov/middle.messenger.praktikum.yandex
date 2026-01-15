import { router } from '@/app/router/router';
import store from '@/app/store/store';
import { SessionApi } from '@/entities/Session/api/SessionApi';

const sessionAPI = new SessionApi();

export class SessionController {
  public async getUser() {
    const res = sessionAPI.getUser();

    res.then((res) => {
      const user = JSON.parse(res as string);

      if (Object.hasOwn(user, 'id')) {
        store.set({ user });
      } else {
        store.set({ user: null });
      }
    });
    return res;
  }
  public async logout() {
    await sessionAPI.logout();
    store.clean();
    router.go('/');
  }
}
