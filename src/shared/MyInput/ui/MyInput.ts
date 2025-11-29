import { validateInput } from '@/pages/Auth/utils/Validate';
import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { itemsStyleClasses, type MyInputProps } from '../model/types';
import { clearInputTemplate, myInputTemplate } from '../template/MyInput';
import './MyInput.css';

const template = new Templator(myInputTemplate);
const cleanTemplate = new Templator(clearInputTemplate);

export class MyInput extends Block<MyInputProps> {
  constructor(props: MyInputProps) {
    const { isValidate = false } = props;
    const events = isValidate
      ? {
          blur: {
            listener: () => setTimeout(() => this.validate(), 0),
            useCapture: true,
          },
        }
      : {};

    super({
      ...props,
      events: {
        ...(props.events || {}),
        ...events,
      },
    });
  }

  public validate() {
    let input;
    if (this.element instanceof HTMLInputElement) {
      input = this.element;
    } else {
      input = this.element?.querySelector('input');
    }

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
      inputStyle = 'column',
      inputType,
      label,
      name,
      errorText,
      value = '',
      isClean = false,
      placeholder,
      inputClassname,
    } = this.props;
    const inputClass = `${itemsStyleClasses[inputStyle]} ${errorText ? 'myInput--error' : ''}`;
    const compileProps = {
      isDisabled: disabled,
      errorText: errorText || '',
      inputClass,
      inputType,
      label,
      name,
      value,
      placeholder,
      inputClassname,
    };

    return isClean ? cleanTemplate.compile(compileProps) : template.compile(compileProps);
  }
}
