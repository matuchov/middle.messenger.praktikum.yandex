import type { defaultProps } from '@/app/utils/Block';
import { Profile } from '@/widgets/Profile';
import { settingsPattern } from '../model/pattern';
import { SettingsController } from '../model/controller';

const controller = new SettingsController();

export class Settings extends Profile {
  constructor(props: defaultProps) {
    const pattern = settingsPattern;
    const onSubmit = controller.changeUser;
    super({ ...props, pattern, onSubmit });
  }
}
