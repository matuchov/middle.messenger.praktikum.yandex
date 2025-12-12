import { MyInput } from '@/shared/MyInput';
import { Form } from '@/entities/Form';
import { MyButtonBlock } from '@/shared/MyButtonBlock';
import { Dropdown } from '@/shared/Dropdown';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import { ChatFooterTemplate } from './template/ChatFooter';
import type { ChatFooterProps } from './model/types';
import { footerDropdown } from './model/footerDropdown';
import './ChatFooter.css';
import controller from '../../model/ChatController';

const template = new Templator(ChatFooterTemplate);

export class ChatFooter extends Block<ChatFooterProps> {
  constructor(props: ChatFooterProps) {
    const dropdownComponent = new Dropdown(footerDropdown);
    const inputs = [
      new MyInput({
        name: 'message',
        inputType: 'text',
        inputClassname: 'chat__input',
        placeholder: 'Введите сообщение',
        isClean: true,
        isValidate: false,
      }),
    ];
    const submitButton = new MyButtonBlock({
      btnType: 'submit',
      btnClass: 'chat__send-button',
      btnText: '>',
    });
    const form = new Form({
      formContent: inputs,
      subminBtn: submitButton,
      formClass: 'chat__form',
      events: {
        submit: {
          listener: (e) => {
            this.onSubmit(e);
          },
        },
      },
    });

    super({ ...props, dropdownComponent, form, inputs });
  }

  protected onSubmit(e: SubmitEvent) {
    e.preventDefault();
    let isValid = true;
    this.children.inputs?.forEach((el) => {
      if (el instanceof MyInput) {
        if (el.validate() === false) {
          isValid = false;
        }
      }
    });

    if (isValid && e.target instanceof HTMLFormElement) {
      const data = new FormData(e.target);
      controller.sendMessage([...data.entries()][0][1]);
      console.log([...data.entries()]);
    }
  }

  render() {
    const { dropdownComponent, form } = this.children;
    return template.compile({ dropdownComponent, form });
  }
}
