export interface MyButtonProps {
  btnType?: 'submit' | 'button';
  theme?: keyof typeof btnThemes;
  onclick?: string;
  btnClass?: string;
  iconSrc?: string;
  iconClass?: string;
  textClass?: string;
  btnText?: string;
}

export const btnThemes = {
  default: 'mybutton',
  clear: '',
};
