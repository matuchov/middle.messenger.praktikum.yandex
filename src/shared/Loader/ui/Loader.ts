import { Templator } from '@/app/utils/TemplatorClass';
import { Block, type defaultProps } from '@/app/utils/Block';
import { loaderTemplate } from '../template/Loader';
import './Loader.css';

const template = new Templator(loaderTemplate);

export class Loader extends Block<defaultProps> {
  render() {
    return template.compile({ template });
  }
}
