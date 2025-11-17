import { Block } from './utils/Block';
import { templator } from './utils/Templator';

const crTemp = templator(`<form class="auth">
  {{ name }}
</form>
`);

type TProps = {
  name: string;
};

export class childClass extends Block<TProps> {
  render() {
    return {
      el: crTemp({
        setChildrens: {},
        setProps: {
          name: this.props.name,
        },
      }),
      bindings: {
        setProps: {},
        setChildrens: {},
      },
    };
  }
}
