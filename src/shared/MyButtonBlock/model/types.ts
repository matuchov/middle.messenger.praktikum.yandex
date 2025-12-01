import type { defaultProps } from '@/app/utils/Block';

export const btnThemes = {
  default: 'mybutton',
  clear: '',
};
export interface MyButtonProps extends defaultProps {
  btnType?: 'submit' | 'button';
  theme?: keyof typeof btnThemes;
  onclick?: string;
  btnClass?: string;
  iconSrc?: string;
  iconClass?: string;
  textClass?: string;
  btnText?: string;
}
