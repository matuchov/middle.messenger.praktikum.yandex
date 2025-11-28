import type { defaultProps } from '@/app/utils/Block';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import type { MyInput, MyInputProps } from '@/shared/MyInput';

export interface FormProps extends defaultProps {
  formClass?: string;
  formAction?: string;
  formMetod?: 'dialog' | 'get' | 'post';
  subminBtn?: MyButtonBlock;
  formContent?: MyInput[];
}
