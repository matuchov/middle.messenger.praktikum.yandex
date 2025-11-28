import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { itemsStyleClasses, type MyInputProps } from '../model/types';
import { myInputTemplate } from '../template/MyInput';
import './MyInput.css';
import { validateInput } from '@/pages/Auth/utils/validate';

const template = new Templator(myInputTemplate);

export class MyInput extends Block<MyInputProps> {
  constructor(props: MyInputProps) {
    super({
      ...props,
      events: {
        ...(props.events || {}),
        blur: {
          listener: () => setTimeout(() => this.validate(), 0),
          useCapture: true,
        },
      },
    });
  }

  public validate() {
    const input = this.element?.querySelector('input');
    const value = input?.value || '';
    const errorText = validateInput(this.props.name, value);

    if (errorText) {
      this.setProps({ errorText, value });

      return false;
    }
    this.setProps({ errorText: '', value });
    return true;
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

    const inputClass = `${itemsStyleClasses[inputStyle]} ${errorText ? 'myInput--error' : ''}`;

    return template.compile({
      isDisabled: disabled,
      errorText: errorText || '',
      inputClass,
      inputType,
      label,
      name,
      value,
    });
  }
}
