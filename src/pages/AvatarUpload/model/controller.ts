import { AvatarUploadApi } from './AvatarUploadApi';

const api = new AvatarUploadApi();

export class AvatarUploadController {
  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
    console.log(e.target);
    const form = new FormData(e.target as HTMLFormElement);

    // this.upload(form);
    const data = Object.fromEntries(form);
    const file = data.avatar as File;
    console.log(file.size);
  }

  public upload(data: FormData) {
    const res = api.uploadAvatar(data);

    res.then((res) => {
      console.log(res);
    });
    return res;
  }
}
