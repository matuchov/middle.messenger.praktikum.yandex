import type { MyInputProps } from '@/shared/MyInput';

export interface FormProps {
  formClass?: string;
  formAction?: string;
  formMetod?: 'dialog' | 'get' | 'post';
  subminBtn?: Element | DocumentFragment;
  formContent?: Element | DocumentFragment;
}
