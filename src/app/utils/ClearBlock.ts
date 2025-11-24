import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';


const template = new Templator(...);

export class ... extends Block<...> {
  render() {
    
    const { ... } = this.props;
    return template.compile({...  });
  }
}