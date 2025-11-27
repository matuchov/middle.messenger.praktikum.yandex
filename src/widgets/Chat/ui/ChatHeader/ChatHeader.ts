import { Avatar } from '@/shared/Avatar';
import { Dropdown } from '@/shared/Dropdown';
import { ChatHeaderTemplate } from './template/ChatHeader';
import './Chatheader.css';

import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import type { ChatHeaderProps } from './model/types';

const template = new Templator(ChatHeaderTemplate);

export class ChatHeader extends Block<ChatHeaderProps> {
  protected init(): void {
    this.props.avatarComponent = new Avatar({});
    this.props.dropdownComponent = new Dropdown({
      direction: 'bottomRight',
      icons: [
        {
          iconSrc: '/assets/addUser.svg',
          itemText: 'Добавить пользователя',
          onclick: '',
        },
        {
          iconSrc: '/assets/deleteUser.svg',
          itemText: 'Удалить пользователя',
          onclick: '',
        },
      ],
      btnIconSrc: '/assets/dots.svg',
    });
  }

  render() {
    const { name } = this.props;
    return template.compile({
      name,
      avatarComponent: this.getDom(this.props.avatarComponent),
      dropdownComponent: this.getDom(this.props.dropdownComponent),
    });
  }
}
