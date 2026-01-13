import store from '@/app/store/store';
import { RegistrationApi } from '../api/RegistrationApi.ts';

const loginApi = new RegistrationApi();

export class RegistrationController {
  public signup(data: { [k: string]: FormDataEntryValue }) {
    const res = loginApi.signup(data);

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
            signup: {
              error,
            },
          },
        });
      });
    return res;
  }
}
