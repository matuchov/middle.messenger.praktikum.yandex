import { itemsStyleClasses, type MyInputProps } from '../model/types';
import MyInputTemlpate from '../template/MyInput.mtmp';
import './MyInput.css';

export const MyInput = ({
  disabled = false,
  inputStyle,
  inputType,
  label,
  name,
  errorText,
  value = '',
}: MyInputProps) => {
  const isDisabled = disabled ? 'disabled' : '';
  const inputClass = `${itemsStyleClasses[inputStyle]} ${errorText ? 'myInput--error' : ''}`;

  return MyInputTemlpate({
    isDisabled,
    errorText: errorText || '',
    inputClass,
    inputType,
    label,
    name,
    value,
  });
};
