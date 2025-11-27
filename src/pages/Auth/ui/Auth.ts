import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block.ts';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import type { AuthProps } from '../model/types';
import { authTemplate } from '../template/Auth.ts';
import { AuthPatterns } from '../model/pattern';
import './Auth.css';

const template = new Templator(authTemplate);

export class Auth extends Block<AuthProps> {
  protected init(): void {
    const { page } = this.props;
    this.props.inputs = AuthPatterns[page].inputs.map((el) => new MyInput(el));
    this.props.subminBtn = new MyButtonBlock(AuthPatterns[page].button);
    this.props.form = new Form({
      formClass: 'auth__form',
      formContent: this.getDom(this.props.inputs),
      subminBtn: this.getDom(this.props.subminBtn),
      events: {
        submit: {
          listener: (e) => {
            this.onSubmit(e);
          },
        },
      },
    });
    this.props.box = new Box({
      boxClass: 'auth__box',
      children: this.getDom(this.props.form),
    });
  }

  protected onSubmit(e: SubmitEvent) {
    e.preventDefault();
    let isValid = true;
    this.props.inputs?.forEach((el) => {
      if (el instanceof MyInput) {
        if (el.validate() === false) {
          isValid = false;
        }
      }
    });

    if (isValid && e.target instanceof HTMLFormElement) {
      const data = new FormData(e.target);
      console.log([...data.entries()]);
    }
  }

  render() {
    return template.compile({
      pageContent: this.getDom(this.props.box),
    });
  }
}
