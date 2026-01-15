import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import type { MyLinkProps } from '../model/types';
import MyLinkTemlpate from '../template/MyLink';
import { router } from '@/app/router/router';

const tepmlate = new Templator(MyLinkTemlpate);

export class MyLink extends Block<MyLinkProps> {
  constructor(props: MyLinkProps) {
    const { linkHref = '#' } = props;

    const events = {
      click: {
        listener: (e: PointerEvent) => {
          e.preventDefault();
          router.go(linkHref);
        },
      },
    };
    super({ events, ...props });
  }
  render() {
    const { linkClassName = '', linkText = '' } = this.props;
    const { child } = this.children;
    return tepmlate.compile({ linkClassName, linkText, child });
  }
}
