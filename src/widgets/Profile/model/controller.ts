import { MyInput } from '@/shared/MyInput';
import type Profile from '../ui/Profile';

export class ProfileController {
  public onSubmit(e: SubmitEvent, profile: InstanceType<typeof Profile>) {
    e.preventDefault();
    console.log(e);

    let isValid = true;
    profile.children.inputs?.forEach((el) => {
      if (el instanceof MyInput) {
        if (el.validate() === false) {
          isValid = false;
        }
      }
    });
    console.log(profile.props.onSubmit);

    if (isValid && e.target instanceof HTMLFormElement && profile.props.onSubmit) {
      profile.props.onSubmit(e.target);
    }
  }
}
