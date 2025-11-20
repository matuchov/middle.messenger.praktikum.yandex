import { MyInput, type MyInputProps } from '@/shared/MyInput';
import type { FormProps } from '../model/types';
import FormTemlpate from '../template/Form.tple';
import { Block } from '@/app/utils/Block';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import { templator } from '@/app/utils/Templator';

export class Form extends Block<FormProps> {
  render() {
    const {
      inputs,
      formClass = '',
      formAction = '',
      formMetod = 'post',
      subminBtn = new MyButtonBlock({ btnType: 'submit', btnText: 'Отправить' }),
      disabled = false,
    } = this.props;
    const createFormContent = (fields: MyInputProps[]) => fields.map(MyInput).join('');
    const discabledinputs = (fields: MyInputProps[]) =>
      fields.map((el) => ({ ...el, disabled: true }));

    const formContent = disabled
      ? createFormContent(discabledinputs(inputs))
      : createFormContent(inputs);

    return templator(FormTemlpate)({
      formAction,
      formClass,
      formContent,
      formMetod,
      subminBtn,
    });
  }
}
