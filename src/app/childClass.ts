import { Block } from './utils/Block';
import { templator } from './utils/Templator';

const crTemp = templator(`<form class="auth">
  {{ name }}
</form>
`);

export type TChildClass = {
  name: string;
};

export class ChildClass extends Block<TChildClass> {
  render() {
    return crTemp({
      setChildrens: {},
      setProps: {
        name: this.props.name,
      },
    });
  }
}
