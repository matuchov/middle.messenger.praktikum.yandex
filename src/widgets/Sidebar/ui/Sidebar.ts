import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock';
import { sidebarTemplate } from '../template/SidebarTemplate';
import type { SidebarProps } from '../model/types';
import { SidebarController } from '../model/SidebarCotroller';
import './Sidebar.css';

const template = new Templator(sidebarTemplate);
const controller = new SidebarController();

export class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    const addChatBtn = new MyButtonBlock({
      btnClass: 'sidebar__addChatBtn',
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
    const shatlist = new Chatlist({});

    super({ ...props, link, shatlist, addChatBtn });
  }

  render() {
    const { link, shatlist, addChatBtn } = this.children;
    return template.compile({
      addChatBtn,
      link,
      shatlist,
    });
  }
}
