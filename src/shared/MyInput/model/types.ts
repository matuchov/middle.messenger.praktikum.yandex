import type { defaultProps } from '@/app/utils/Block';

export const itemsStyleClasses = {
  row: 'myInput--row',
  column: 'myInput--column',
};
export interface MyInputProps extends defaultProps {
  errorText?: string;
  inputStyle: keyof typeof itemsStyleClasses;
  inputType: string;
  label: string;
  name: string;
  value?: string;
  disabled?: boolean;
}
