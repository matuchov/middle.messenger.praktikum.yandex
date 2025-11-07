import type { MyButtonProps } from '@/shared/MyButton';
import type { MyInputProps } from '@/shared/MyInput';
import type { MyLinkProps } from '@/shared/MyLink';

type PatternType = {
  inputs: MyInputProps[];
  button: MyButtonProps;
  link: MyLinkProps;
};

export type AuthPatternsType = Record<string, PatternType>;

export type AuthProps = {
  page: 'login' | 'registration';
};
