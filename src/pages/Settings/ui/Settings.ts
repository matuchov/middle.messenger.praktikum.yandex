import type { defaultProps } from '@/app/utils/Block';
import { Profile } from '@/widgets/Profile';
import { settingsPattern } from '../model/pattern';

export class Settings extends Profile {
  constructor(props: defaultProps) {
    const pattern = settingsPattern;

    super({ ...props, pattern });
  }
}
