import store from '@/app/store/store';
import { ProfileAPI } from '../api/ProfileAPI';

const profileAPI = new ProfileAPI();

export class ProfileController {
  public changeUser(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form));
    console.log(data);

    const res = profileAPI.changeUser(data);

    res.then((res) => {
      const user = JSON.parse(res as string);
      if (Object.hasOwn(user, 'id')) {
        store.set({ user });
      }
    });
    return res;
  }
}
