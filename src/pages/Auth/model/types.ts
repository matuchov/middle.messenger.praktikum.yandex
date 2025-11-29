import type { defaultProps } from '@/app/utils/Block';
import type { Form } from '@/entities/Form';
import type { Box } from '@/shared/Box';
import type { MyButtonProps } from '@/shared/MyButtonBlock';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import type { MyInput, MyInputProps } from '@/shared/MyInput';
import type { MyLinkProps } from '@/shared/MyLink';

type PatternType = {
  inputs: MyInputProps[];
  button: MyButtonProps;
  link: MyLinkProps;
};

export type AuthPatternsType = Record<string, PatternType>;

export interface AuthProps extends defaultProps {
  page: 'login' | 'registration';
  inputs?: MyInput[];
  form?: Form;
  subminBtn?: MyButtonBlock;
  box?: Box;
}
