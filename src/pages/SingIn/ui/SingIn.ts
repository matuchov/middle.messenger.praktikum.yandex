import type { AuthProps } from '../model/types.ts';
import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block.ts';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { authTemplate } from '../template/SingIn.ts';
import { SingInPatterns } from '../model/pattern.ts';
import { SingInApi } from '../api/SingIn.ts';
import './SingIn.css';

const template = new Templator(authTemplate);

const api = new SingInApi();

export class SingIn extends Block<AuthProps> {
  constructor(props: AuthProps) {
    const errorText = 'error';
    const inputs = SingInPatterns.inputs.map((el) => new MyInput({ ...el, isValidate: true }));
    const subminBtn = new MyButtonBlock(SingInPatterns.button);
    const form = new Form({
      formClass: 'singin__form',
      formContent: inputs,
      subminBtn,
      errorText,
      events: {
        submit: {
          listener: (e) => {
            this.onSubmit(e);
          },
        },
      },
    });
    const box = new Box({
      boxClass: 'singin__box',
      children: form,
    });

    super({ ...props, inputs, subminBtn, form, box });
  }

  protected createResources() {}

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
      const data = Object.fromEntries(new FormData(e.target));
      api.singin(data);
    }
  }

  render() {
    return template.compile({
      pageContent: this.children.box,
    });
  }
}
