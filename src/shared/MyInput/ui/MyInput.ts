import { Templator } from '@/app/utils/TemplatorClass';
import { itemsStyleClasses, type MyInputProps } from '../model/types';

import './MyInput.css';
import { myInputTemplate } from '../template/MyInput';
import { Block } from '@/app/utils/Block';

const template = new Templator(myInputTemplate);

export class MyInput extends Block<MyInputProps> {
  render() {
    const {
      disabled = false,
      inputStyle,
      inputType,
      label,
      name,
      errorText,
      value = '',
    } = this.props;
    const isDisabled = disabled ? 'disabled' : '';
    const inputClass = `${itemsStyleClasses[inputStyle]} ${errorText ? 'myInput--error' : ''}`;

    return template.compile({
      isDisabled,
      errorText: errorText || '',
      inputClass,
      inputType,
      label,
      name,
      value,
    });
  }
}
