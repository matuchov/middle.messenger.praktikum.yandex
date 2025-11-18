import type { MyButtonProps } from '@/shared/MyButtonBlock';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import { handleRoute } from './router/router';
import { Block } from './utils/Block';
import { templator } from './utils/Templator';

window.addEventListener('load', handleRoute);

const crTemp = templator(`<main class="auth">
    {{text}}
    <br/>
  {{{ children }}}
</main>
`);

type TProps = {
  text: string;
  button: Block<MyButtonProps>;
  name?: string;
};

class LoginPageClass extends Block<TProps> {
  protected init(): void {
    this.props.button = new MyButtonBlock({ btnText: this.props.text });
  }

  render() {
    return crTemp({
      setChildrens: {
        children: this.props.button.getContent()!,
      },
      setProps: {
        text: this.props.text,
      },
    });
  }
}

const LoginPage = new LoginPageClass({ name: 'adsdsdsds', text: 'text' });

document.body.append(LoginPage.getContent()!);
