import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { itemsStyleClasses, type MyInputProps } from '../model/types';
import { myInputTemplate } from '../template/MyInput';
import './MyInput.css';

const template = new Templator(myInputTemplate);

export class MyInput extends Block<MyInputProps> {
  public validate() {
    const input = this.element?.querySelector('input');
    console.log(input?.value);
    this.setProps({ errorText: input?.value, value: input?.value });
  }

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
