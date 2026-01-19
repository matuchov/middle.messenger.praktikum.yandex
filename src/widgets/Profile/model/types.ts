import type { defaultProps } from '@/app/utils/Block';
import type { Form } from '@/entities/Form';
import type { Avatar } from '@/shared/Avatar';
import type { MyButtonProps } from '@/shared/MyButtonBlock';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import type { MyInput, MyInputProps } from '@/shared/MyInput';
import type { MyLink, MyLinkProps } from '@/shared/MyLink';

export type ProfilePattern = {
  inputs: MyInputProps[];
  submitBtn: MyButtonProps;
  links?: MyLinkProps[];
  isValidate?: boolean;
};

export interface Iuser {
  avatar?: string | null;
  display_name?: string;
  email?: string;
  first_name?: string;
  id: number;
  login?: string;
  phone?: string;
  second_name?: string;
}

export interface ProfileProps extends defaultProps {
  onSubmit?: (form: HTMLFormElement) => Promise<unknown>;
  pattern: ProfilePattern;
  isProfileEdit?: boolean;
  links?: MyLink[];
  avatar?: Avatar;
  inputs?: MyInput[];
  sumbitBtn?: MyButtonBlock;
  formContent?: Form;
  avatarComponent?: MyLink;
  user?: Iuser | null;
}
