import type { AuthProps } from '../model/types.ts';
import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block.ts';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { authTemplate } from '../template/SingIn.ts';
import { SingInPatterns } from '../model/pattern.ts';
import './SingIn.css';
import { SingInController } from '../model/controller.ts';
import type { IStore } from '@/app/store/storeType.ts';
import { connect } from '@/shared/utils/connect/model/connect.ts';

const template = new Templator(authTemplate);

const controller = new SingInController();

class SingIn extends Block<AuthProps> {
  constructor(props: AuthProps) {
    const inputs = SingInPatterns.inputs.map((el) => new MyInput({ ...el, isValidate: false }));
    const subminBtn = new MyButtonBlock(SingInPatterns.button);
    const form = new Form({
      formClass: 'singin__form',
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
      boxClass: 'singin__box',
      children: form,
    });

    super({ ...props, inputs, subminBtn, form, box });
  }

  protected componentDidUpdate(oldProps: AuthProps, newProps: AuthProps): void {
    this.children.form?.setProps({ errorText: newProps.errorText });
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
      const data = Object.fromEntries(new FormData(e.target));
      controller.singin(data);
    }
  }

  render() {
    return template.compile({
      pageContent: this.children.box,
    });
  }
}

function mapSinginError(state: IStore) {
  return {
    errorText: state.forms?.singin?.error,
  };
}

export default connect(SingIn, mapSinginError);
