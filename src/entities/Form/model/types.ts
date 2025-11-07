import type { MyInputProps } from '@/shared/MyInput';

export interface FormProps {
  inputs: MyInputProps[];
  formClass?: string;
  formAction?: string;
  formMetod?: 'dialog' | 'get' | 'post';
  subminBtn?: string;
  disabled?: boolean;
}
