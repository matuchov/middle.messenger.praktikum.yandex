import type { defaultProps } from '@/app/utils/Block/Block';
import type { Validator } from '@/shared/utils/validation/Validate';

export const itemsStyleClasses = {
  row: 'myInput--row',
  column: 'myInput--column',
};

export interface MyInputProps extends defaultProps {
  isValidate?: boolean;
  errorText?: string;
  inputStyle?: keyof typeof itemsStyleClasses;
  inputType: string;
  label?: string;
  name: string;
  value?: string | null;
  disabled?: boolean;
  isClean?: boolean;
  placeholder?: string;
  inputClassname?: string;
  validateRules?: Validator[];
}
