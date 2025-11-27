import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Search } from '@/features/Search';
import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';

import { sidebarTemplate } from '../template/SidebarTemplate';
import './Sidebar.css';

const template = new Templator(sidebarTemplate);

export class Sidebar extends Block<defaultProps> {
  init() {
    this.children = {
      link: new MyLink({ linkText: 'Профиль', linkHref: '/profile' }),
      search: new Search({ value: '' }),
      shatlist: new Chatlist({}),
    };
  }

  render() {
    const { link, search, shatlist } = this.children;
    return template.compile({
      link: this.getDom(link),
      search: this.getDom(search),
      shatlist: this.getDom(shatlist),
    });
  }
}
