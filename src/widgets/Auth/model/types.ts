import type { defaultProps } from '@/app/utils/Block/Block';
import type { Form } from '@/entities/Form';
import type { Box } from '@/shared/Box';
import type { MyButtonProps } from '@/shared/MyButtonBlock';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import type { MyInput, MyInputProps } from '@/shared/MyInput';
import type { MyLinkProps } from '@/shared/MyLink';

export type PatternType = {
  inputs: MyInputProps[];
  button: MyButtonProps;
  link: MyLinkProps;
};

export interface AuthProps extends defaultProps {
  onSubmit: (data: { [k: string]: FormDataEntryValue }) => void;
  pattern: PatternType;
  inputs?: MyInput[];
  form?: Form;
  subminBtn?: MyButtonBlock;
  box?: Box;
  errorText?: string;
}
