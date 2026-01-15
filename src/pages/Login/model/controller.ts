import store from '@/app/store/store';
import { LoginApi } from '../api/LoginApi.ts';
import { router } from '@/app/router/router.ts';
import { SessionController } from '@/entities/Session/index.ts';
import { errorStringify } from '@/shared/utils/errors/errors.ts';

const loginApi = new LoginApi();
const sessionController = new SessionController();

export class SingInController {
  public async singin(data: { [k: string]: FormDataEntryValue }) {
    const currentUser = store.getState().user;
    try {
      if (currentUser) await sessionController.logout();
      await loginApi.singin(data);
      await sessionController.getUser();
      router.go('/messenger');
    } catch (e: unknown) {
      const error = errorStringify(e);
      if (error === 'User already in system') {
        router.go('/messenger');
        return;
      }
      store.set({
        forms: {
          singin: {
            error: error,
          },
        },
      });
    }
  }
}
