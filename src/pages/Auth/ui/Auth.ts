import type { AuthProps } from '../model/types';
import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block.ts';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { authTemplate } from '../template/Auth.ts';
import { AuthPatterns } from '../model/pattern';
import { AuthAPI } from '../api/authApi.ts';
import './Auth.css';

const template = new Templator(authTemplate);

const api = new AuthAPI();

export class Auth extends Block<AuthProps> {
  constructor(props: AuthProps) {
    const page = props.page || 'login';
    const inputs = AuthPatterns[page].inputs.map((el) => new MyInput({ ...el, isValidate: true }));
    const subminBtn = new MyButtonBlock(AuthPatterns[page].button);
    const form = new Form({
      formClass: 'auth__form',
      formContent: inputs,
      subminBtn,
      events: {
        submit: {
          listener: (e) => {
            this.onSubmit(e);
          },
        },
      },
    });

    const box = new Box({
      boxClass: 'auth__box',
      children: form,
    });

    super({ ...props, inputs, subminBtn, form, box });
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
      const page = this.props.page || 'login';
      const data = Object.fromEntries(new FormData(e.target));
      if (page === 'login') {
        api.singin(data);
      } else if (page === 'registration') {
        api.singup(data);
      }
    }
  }

  render() {
    return template.compile({
      pageContent: this.children.box,
    });
  }
}
