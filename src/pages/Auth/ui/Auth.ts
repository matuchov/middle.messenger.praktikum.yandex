import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import { authTemplate } from '../template/Auth.ts';
import type { AuthProps } from '../model/types';
import './Auth.css';
import { AuthPatterns } from '../model/pattern';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block.ts';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';

const template = new Templator(authTemplate);

export class Auth extends Block<AuthProps> {
  render() {
    const { page } = this.props;

    return template.compile({
      children: this.compile(Box, {
        children: this.compile(Form, {
          formClass: 'auth__form',
          formContent: this.compile(MyInput, AuthPatterns[page].inputs),
          subminBtn: this.compile(MyButtonBlock, AuthPatterns[page].button),
        }),
        boxClass: 'auth__box',
      }),
    });
  }
}
