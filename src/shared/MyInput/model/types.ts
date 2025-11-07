export interface MyInputProps {
  errorText?: string;
  inputStyle: keyof typeof itemsStyleClasses;
  inputType: string;
  label: string;
  name: string;
  value?: string;
  disabled?: boolean;
}

export const itemsStyleClasses = {
  row: 'myInput--row',
  column: 'myInput--column',
};
