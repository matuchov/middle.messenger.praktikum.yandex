import { Block } from '@/app/utils/Block';
import type { MyLinkProps } from '../model/types';
import MyLinkTemlpate from '../template/MyLink';
import { Templator } from '@/app/utils/TemplatorClass';

const tepmlate = new Templator(MyLinkTemlpate);

export class MyLink extends Block<MyLinkProps> {
  render() {
    const { linkClassName = '', linkText = '', linkHref = '#', child } = this.props;
    return tepmlate.compile({ linkClassName, linkText, linkHref, child });
  }
}
