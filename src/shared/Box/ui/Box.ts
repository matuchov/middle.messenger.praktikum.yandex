import { Block } from '@/app/utils/Block';
import type { BoxProps } from '../model/types';
import { boxTemplate } from '../template/Box';
import './Box.css';
import { Templator } from '@/app/utils/TemplatorClass';

const template = new Templator(boxTemplate);

export class Box extends Block<BoxProps> {
  render() {
    const { boxClass = '', children } = this.props;
    return template.compile({ boxClass, children });
  }
}
