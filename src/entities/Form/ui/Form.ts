import { MyButton } from '@/shared/MyButton';
import { MyInput, type MyInputProps } from '@/shared/MyInput';
import type { FormProps } from '../model/types';
import FormTemlpate from '../template/Form.mtmp';

export const Form = ({
  inputs,
  formClass = '',
  formAction = '',
  formMetod = 'post',
  subminBtn = MyButton({ btnType: 'submit', btnText: 'Отправить' }),
  disabled = false,
}: FormProps) => {
  const createFormContent = (fields: MyInputProps[]) => fields.map(MyInput).join('');

  const discabledinputs = (fields: MyInputProps[]) =>
    fields.map((el) => ({ ...el, disabled: true }));

  const formContent = disabled
    ? createFormContent(discabledinputs(inputs))
    : createFormContent(inputs);

  return FormTemlpate({
    formAction,
    formClass,
    formContent,
    formMetod,
    subminBtn,
  });
};
