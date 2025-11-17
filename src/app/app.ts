import { childClass } from './childClass';
import { handleRoute } from './router/router';
import { Block } from './utils/Block';
import { templator } from './utils/Templator';

window.addEventListener('load', handleRoute);

const crTemp = templator(`<main class="auth">
  {{{ children }}}
</main>
`);

type TProps = {
  children: HTMLElement;
  name?: string;
};

class LoginPageClass extends Block<TProps> {
  render() {
    return {
      el: crTemp({
        setChildrens: {
          children: this.props.children,
        },
        setProps: {},
      }),
      bindings: {
        setProps: {},
        setChildrens: {},
      },
    };
  }
}

const LoginPage = new LoginPageClass({ children: document.createElement('div') });

document.body.appendChild(LoginPage.getContent()!);
