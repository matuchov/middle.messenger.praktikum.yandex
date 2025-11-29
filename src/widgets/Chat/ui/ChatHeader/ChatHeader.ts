import { Avatar } from '@/shared/Avatar';
import { Dropdown } from '@/shared/Dropdown';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatHeaderTemplate } from './template/ChatHeader';
import './Chatheader.css';
import type { ChatHeaderProps } from './model/types';

const template = new Templator(ChatHeaderTemplate);

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    const avatarComponent = new Avatar({});
    const dropdownComponent = new Dropdown({
      direction: 'bottomRight',
      items: [
        {
          itemSrc: '/assets/addUser.svg',
          itemText: 'Добавить пользователя',
        },
        {
          itemSrc: '/assets/deleteUser.svg',
          itemText: 'Удалить пользователя',
        },
      ],
      btnIconSrc: '/assets/dots.svg',
    });
    super({ ...props, avatarComponent, dropdownComponent });
  }

  render() {
    const { name } = this.props;
    const { avatarComponent, dropdownComponent } = this.children;
    return template.compile({
      name,
      avatarComponent,
      dropdownComponent,
    });
  }
}
