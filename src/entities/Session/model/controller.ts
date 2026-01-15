import { router } from '@/app/router/router';
import store from '@/app/store/store';
import { SessionApi } from '@/entities/Session/api/SessionApi';

const sessionAPI = new SessionApi();

export class SessionController {
  public async getUser() {
    try {
      const res = await sessionAPI.getUser();
      const user = JSON.parse(res as string);

      if (Object.hasOwn(user, 'id')) {
        store.set({ user });
      } else {
        store.set({ user: null });
      }
      return res;
    } catch (e) {
      return e;
    }
  }
  public async logout() {
    await sessionAPI.logout();
    store.clean();
    router.go('/');
  }
}
