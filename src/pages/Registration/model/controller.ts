import { SessionController } from './../../../entities/Session/model/controller';
import store from '@/app/store/store';
import { RegistrationApi } from '../api/RegistrationApi.ts';
import { router } from '@/app/router/router.ts';

const loginApi = new RegistrationApi();
const sessionController = new SessionController();

export class RegistrationController {
  public async signup(data: { [k: string]: FormDataEntryValue }) {
    const currentUser = store.getState().user;
    if (currentUser) {
      store.set({
        forms: {
          signup: {
            error: 'Для регистрации необходимо выйти из приложения',
          },
        },
      });
      return;
    }
    try {
      const res = await loginApi.signup(data);
      try {
        await sessionController.getUser();
        router.go('/messenger');
      } catch (e) {
        /* ignore */
      }
      return res;
    } catch (e) {
      let errorMessage = 'Unknown error';
      try {
        const errorData = typeof e === 'string' ? JSON.parse(e) : e;
        errorMessage = errorData?.reason || errorMessage;
      } catch {
        /* ignore */
      }

      store.set({
        forms: { signup: { error: errorMessage } },
      });
    }
  }
}
