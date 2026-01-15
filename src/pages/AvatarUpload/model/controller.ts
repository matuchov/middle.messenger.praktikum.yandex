import { validate } from '@/shared/utils/validation/Validate';
import { AvatarUploadApi } from './AvatarUploadApi';

const api = new AvatarUploadApi();

export class AvatarUploadController {
  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const errors = [];
    const data = Object.fromEntries(form);
    const file = data.avatar as File;
    errors.push(validate([], file.name));
    console.log(errors);

    // this.upload(form);
  }

  public upload(data: FormData) {
    const res = api.uploadAvatar(data);

    res.then((res) => {
      console.log(res);
    });
    return res;
  }
}
