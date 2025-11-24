import type { FormProps } from '../model/types';
import { formTemlpate } from '../template/Form';
import { Block } from '@/app/utils/Block';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import { Templator } from '@/app/utils/TemplatorClass';

const temlpate = new Templator(formTemlpate);

export class Form extends Block<FormProps> {
  render() {
    const {
      formClass,
      formAction,
      formMetod = 'post',
      subminBtn = new MyButtonBlock({ btnType: 'submit', btnText: 'Отправить' }).getContent(),
      formContent,
    } = this.props;

    return temlpate.compile({
      formAction,
      formClass,
      formContent,
      formMetod,
      subminBtn,
    });
  }
}
