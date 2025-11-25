import type { defaultProps } from '@/app/utils/Block';
import type { MyInputProps } from '@/shared/MyInput';

export interface FormProps extends defaultProps {
  formClass?: string;
  formAction?: string;
  formMetod?: 'dialog' | 'get' | 'post';
  subminBtn?: Element | DocumentFragment;
  formContent?: Element | DocumentFragment;
}
