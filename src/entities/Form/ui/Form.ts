import { MyButton } from '@/shared/MyButton';
import type { FormProps } from '../model/types';
import FormTemlpate from '../template/Form.mtmp';
import { MyInput } from '@/shared/MyInput';

export const Form = ({
  inputs,
  formClass = '',
  formAction = '',
  formMetod = 'post',
  subminBtn = MyButton({ btnType: 'submit', btnText: 'Отправить' }),
  disabled = false,
}: FormProps) => {
  if (disabled) {
    inputs = inputs.map((el) => ({ ...el, disabled: true }));
  }

  const formContent = inputs.map(MyInput).join('');

  return FormTemlpate({
    formAction,
    formClass,
    formContent,
    formMetod,
    subminBtn,
  });
};
