import type { FormProps } from '../model/types';
import { formTemlpate } from '../template/Form';
import { Block } from '@/app/utils/Block';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import { Templator } from '@/app/utils/TemplatorClass';

const temlpate = new Templator(formTemlpate);

export class Form extends Block<FormProps> {
  render() {
    const { formClass, formAction, formMetod = 'post' } = this.props;

    const { formContent, subminBtn } = this.children;
    console.log('form render');

    return temlpate.compile({
      formAction,
      formClass,
      formContent,
      formMetod,
      subminBtn,
    });
  }
}
