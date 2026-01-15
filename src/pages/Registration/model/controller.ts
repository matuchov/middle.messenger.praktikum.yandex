import { SessionController } from './../../../entities/Session/model/controller';
import store from '@/app/store/store';
import { RegistrationApi } from '../api/RegistrationApi.ts';
import { router } from '@/app/router/router.ts';
import { errorStringify } from '@/shared/utils/errors/errors.ts';

const loginApi = new RegistrationApi();
const sessionController = new SessionController();

export class RegistrationController {
  public async signup(data: { [k: string]: FormDataEntryValue }) {
    const currentUser = store.getState().user;
    try {
      if (currentUser) await sessionController.logout();
      await loginApi.signup(data);
      await sessionController.getUser();
      router.go('/messenger');
    } catch (e) {
      const error = errorStringify(e);
      store.set({
        forms: { signup: { error } },
      });
    }
  }
}
