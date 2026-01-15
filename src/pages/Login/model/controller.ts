import store from '@/app/store/store';
import { LoginApi } from '../api/LoginApi.ts';
import { router } from '@/app/router/router.ts';
import { SessionController } from '@/entities/Session/index.ts';

const loginApi = new LoginApi();
const sessionController = new SessionController();

export class SingInController {
  public singin(data: { [k: string]: FormDataEntryValue }) {
    const res = loginApi.singin(data);

    res
      .then(() => {
        sessionController.getUser().then(() => {
          router.go('/messenger');
        });
      })
      .catch((e) => {
        const responce = JSON.parse(e as string);
        const error = responce?.reason;

        if (error === 'User already in system') {
          router.go('/messenger');
          return;
        }
        store.set({
          forms: {
            singin: {
              error,
            },
          },
        });
      });
    return res;
  }
}
