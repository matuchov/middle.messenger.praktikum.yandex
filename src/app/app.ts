import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';

import { Block } from './utils/Block';
import { templator } from './utils/Templator';
import { Templator } from './utils/TemplatorClass';

// window.addEventListener('load', handleRoute);
//

const crTemp = `<main class="auth">
    {{text}}
    </br>
  {{{ children }}}

</main>
`;

const template = new Templator(crTemp);

type TProps = {
  text: string;
  name?: string;
  data?: object;
};

const data = [
  { btnText: '1', theme: 'default' },
  { btnText: '23', theme: 'default' },
  { btnText: '3', theme: 'default' },
  { btnText: '5', theme: 'default' },
];

const data2 = [
  { btnText: 'dsasda', theme: 'default' },
  { btnText: 'bvchgdf', theme: 'default' },
  { btnText: 'ddsgcv', theme: 'default' },
  { btnText: 'dsgfdd', theme: 'default' },
];

// new Array(1000).fill('123').forEach((el) => {
//   data2.push({ btnText: el, theme: 'default' });
// });

class LoginPageClass extends Block<TProps> {
  protected init(): void {
    this.props.data = data;
  }

  render() {
    return template.compile({
      children: this.compile(MyButtonBlock, this.props.data!),
      text: this.props.text,
    });
  }
}

const LoginPage = new LoginPageClass({ name: 'adsdsdsds', text: 'text' });

setTimeout(() => {
  const start = Date.now();
  LoginPage.setProps({
    text: 'new text',
    data: data2,
  });
  console.log(`Time taken: ${Date.now() - start}ms`);
}, 2000);

document.getElementById('app')?.append(LoginPage.getContent()!);
