import store from '@/app/store/store';
import { LoginApi } from '../api/LoginApi.ts';

const loginApi = new LoginApi();

export class SingInController {
  public singin(data: { [k: string]: FormDataEntryValue }) {
    const res = loginApi.singin(data);

    res
      .then((res) => {
        const responce = JSON.parse(res as string);
        console.log(responce);
      })
      .catch((e) => {
        const responce = JSON.parse(e as string);
        const error = responce?.reason;
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
