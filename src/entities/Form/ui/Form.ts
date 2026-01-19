import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import type { FormProps } from '../model/types';
import { formTemlpate } from '../template/Form';
import './Form.css';

const temlpate = new Templator(formTemlpate);

export class Form extends Block<FormProps> {
  render() {
    const { formClass, formAction, formMetod = 'post', errorText } = this.props;
    const { formContent, subminBtn } = this.children;

    return temlpate.compile({
      formAction,
      formClass,
      formContent,
      formMetod,
      subminBtn,
      errorText,
    });
  }
}
