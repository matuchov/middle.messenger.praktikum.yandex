import type { defaultProps } from '@/app/utils/Block';
import type { Form } from '@/entities/Form';
import type { Avatar } from '@/shared/Avatar';
import type { MyButtonProps } from '@/shared/MyButtonBlock';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import type { MyInput, MyInputProps } from '@/shared/MyInput';
import type { MyLink, MyLinkProps } from '@/shared/MyLink';

export type pageTypes = 'default' | 'edit' | 'changepass';

export type ProfilePattern = {
  inputs: MyInputProps[];
  submitBtn?: MyButtonProps;
  links?: MyLinkProps[];
  disabled: boolean;
  isValidate?: boolean;
};

export interface ProfileProps extends defaultProps {
  pattern: ProfilePattern;
  isEdit?: boolean;
  links?: MyLink[];
  page: pageTypes;
  avatar?: Avatar;
  inputs?: MyInput[];
  sumbitBtn?: MyButtonBlock;
  formContent?: Form;
  avatarComponent?: MyLink;
  user?: {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
  };
}
