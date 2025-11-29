import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import type { BoxProps } from '../model/types';
import { boxTemplate } from '../template/Box';
import './Box.css';

const template = new Templator(boxTemplate);

export class Box extends Block<BoxProps> {
  render() {
    const { boxClass = '' } = this.props;
    const { children } = this.children;
    return template.compile({ boxClass, children });
  }
}
