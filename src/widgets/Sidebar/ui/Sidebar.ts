import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Search } from '@/features/Search';
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
    const addUserBtn = new MyButtonBlock({
      btnType: 'button',
      theme: 'default',
      btnText: 'Добавить пользователя',
      events: {
        click: {
          listener: () => {
            controller.addUser();
          },
        },
      },
    });
    const link = new MyLink({ linkText: 'Профиль', linkHref: '/profile' });
    const search = new Search({ value: '' });
    const shatlist = new Chatlist({});
    super({ ...props, link, search, shatlist, addChatBtn, addUserBtn });
  }

  render() {
    const { link, search, shatlist, addChatBtn, addUserBtn } = this.children;
    return template.compile({
      addChatBtn,
      link,
      search,
      shatlist,
      addUserBtn,
    });
  }
}
