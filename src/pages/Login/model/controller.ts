import store from '@/app/store/store';
import { LoginApi } from '../api/LoginApi.ts';
import { router } from '@/app/router/router.ts';

const loginApi = new LoginApi();

export class SingInController {
  public singin(data: { [k: string]: FormDataEntryValue }) {
    const res = loginApi.singin(data);

    res
      .then((res) => {
        router.go('/messenger');
      })
      .catch((e) => {
        const responce = JSON.parse(e as string);
        const error = responce?.reason;
        console.log(error);
        console.log(error === 'User already in system');

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

  public setEdit() {}
}
