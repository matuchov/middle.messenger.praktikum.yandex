import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Block } from '@/app/utils/Block/Block';
import { Templator } from '@/app/utils/Templator/TemplatorClass';
import { sidebarTemplate } from '../template/SidebarTemplate';
import type { SidebarProps } from '../model/types';
import './Sidebar.css';
import CreateChat from './CreateChat/CreateChat';

const template = new Templator(sidebarTemplate);

export class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    const createChat = new CreateChat();

    const link = new MyLink({ linkText: 'Профиль', linkHref: '/settings' });
    const shatlist = new Chatlist({});

    super({ ...props, link, shatlist, createChat });
  }

  render() {
    const { link, shatlist, createChat } = this.children;
    return template.compile({
      createChat,
      link,
      shatlist,
    });
  }
}
