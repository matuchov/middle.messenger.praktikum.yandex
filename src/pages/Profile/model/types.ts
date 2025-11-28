import type { defaultProps } from '@/app/utils/Block';
import type { Form } from '@/entities/Form';
import type { Avatar } from '@/shared/Avatar';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import type { MyInput } from '@/shared/MyInput';
import type { MyLink } from '@/shared/MyLink';

export type pageTypes = 'default' | 'edit' | 'changepass';

export interface ProfileProps extends defaultProps {
  links?: MyLink[];
  page: pageTypes;
  avatar?: Avatar;
  inputs?: MyInput[];
  sumbitBtn?: MyButtonBlock;
  formContent?: Form;
  avatarComponent?: MyLink;
}
