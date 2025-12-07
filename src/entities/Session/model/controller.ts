import store from '@/app/store/store';
import { SessionApi } from '@/entities/Session/api/SessionApi';

const sessionAPI = new SessionApi();

export class SessionController {
  public getUser() {
    sessionAPI.getUser().then((res) => {
      const user = JSON.parse(res as string);
      if (Object.hasOwn(user, 'id')) {
        store.set({ user });
      } else {
        store.set({ user: null });
      }
      console.log(user);
    });
  }
}
