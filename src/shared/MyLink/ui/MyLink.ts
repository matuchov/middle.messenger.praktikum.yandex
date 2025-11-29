import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import type { MyLinkProps } from '../model/types';
import MyLinkTemlpate from '../template/MyLink';

const tepmlate = new Templator(MyLinkTemlpate);

export class MyLink extends Block<MyLinkProps> {
  render() {
    const { linkClassName = '', linkText = '', linkHref = '#' } = this.props;
    const { child } = this.children;
    return tepmlate.compile({ linkClassName, linkText, linkHref, child });
  }
}
