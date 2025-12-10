import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Search } from '@/features/Search';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';

import { sidebarTemplate } from '../template/SidebarTemplate';
import './Sidebar.css';
import type { SidebarProps } from '../model/types';
import { MyButtonBlock } from '@/shared/MyButtonBlock';
import { SidebarController } from '../model/SidebarCotroller';

const template = new Templator(sidebarTemplate);
const controller = new SidebarController();

export class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    const addChatBtn = new MyButtonBlock({
      btnType: 'button',
      theme: 'default',
      btnText: 'Создать чат',
      events: {
        click: {
          listener: () => {
            controller.createChat('testchatya');
          },
        },
      },
    });
    const link = new MyLink({ linkText: 'Профиль', linkHref: '/profile' });
    const search = new Search({ value: '' });
    const shatlist = new Chatlist({});
    super({ ...props, link, search, shatlist, addChatBtn });
  }

  render() {
    const { link, search, shatlist, addChatBtn } = this.children;
    return template.compile({
      addChatBtn,
      link,
      search,
      shatlist,
    });
  }
}
