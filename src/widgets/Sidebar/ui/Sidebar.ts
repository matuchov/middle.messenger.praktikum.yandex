import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Search } from '@/features/Search';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';

import { sidebarTemplate } from '../template/SidebarTemplate';
import './Sidebar.css';
import type { SidebarProps } from '../model/types';

const template = new Templator(sidebarTemplate);

export class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    const link = new MyLink({ linkText: 'Профиль', linkHref: '/profile' });
    const search = new Search({ value: '' });
    const shatlist = new Chatlist();
    super({ ...props, link, search, shatlist });
  }

  render() {
    const { link, search, shatlist } = this.children;
    return template.compile({
      link,
      search,
      shatlist,
    });
  }
}
