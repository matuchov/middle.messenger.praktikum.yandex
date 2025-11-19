import type { MyButtonProps } from '@/shared/MyButtonBlock';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';
import { handleRoute } from './router/router';
import { Block } from './utils/Block';
import { templator } from './utils/Templator';

// window.addEventListener('load', handleRoute);

const crTemp = templator(`<main class="auth">
    {{text}}
    <br/>
  {{{ children }}}
</main>
`);

type TProps = {
  text: string;
  name?: string;
};

const data = [
  { btnText: '1', theme: 'default' },
  { btnText: '23', theme: 'default' },
  { btnText: '3', theme: 'default' },
  { btnText: '5', theme: 'default' },
];

class LoginPageClass extends Block<TProps> {
  protected init(): void {
    // this.children.buttonList = data
    console.log(this.children.buttonList);
  }

  render() {
    return crTemp({
      setChildrens: {
        children: this.compile(MyButtonBlock, data),
      },
      setProps: {
        text: this.props.text,
      },
    });
  }
}

const LoginPage = new LoginPageClass({ name: 'adsdsdsds', text: 'text' });

console.log(LoginPage);

document.getElementById('app')?.append(LoginPage.getContent()!);
