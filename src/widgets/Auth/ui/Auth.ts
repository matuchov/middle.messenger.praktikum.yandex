import type { AuthProps } from '../model/types.ts';
import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block.ts';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { authTemplate } from '../template/Auth.ts';
import './Auth.css';

const template = new Templator(authTemplate);

export class Auth extends Block<AuthProps> {
  constructor(props: AuthProps) {
    const pattern = props.pattern;
    const inputs = pattern.inputs.map((el) => new MyInput({ ...el, isValidate: true }));
    const subminBtn = new MyButtonBlock(pattern.button);
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

  protected componentDidUpdate(_: AuthProps, newProps: AuthProps): void {
    this.children.form?.setProps({ errorText: newProps.errorText });
  }

  protected onSubmit(e: SubmitEvent) {
    const { onSubmit } = this.props;
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
      onSubmit(data);
    }
  }

  render() {
    return template.compile({
      pageContent: this.children.box,
    });
  }
}
