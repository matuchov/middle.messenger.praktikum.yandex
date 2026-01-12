import { AvatarUploadApi } from './AvatarUploadApi';

const api = new AvatarUploadApi();

export class AvatarUploadController {
  public upload(data: FormData) {
    const res = api.uploadAvatar(data);

    res.then((res) => {
      console.log(res);
    });
    return res;
  }
}
