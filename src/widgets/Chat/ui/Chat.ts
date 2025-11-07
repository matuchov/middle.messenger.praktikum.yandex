import ChatTemplate from '../template/Chat.mtmp';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { Avatar } from '@/shared/Avatar';
import { Dropdown } from '@/shared/Dropdown';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatFooter } from './ChatFooter/ChatFooter';
import './Chat.css';

export const Chat = () => {
  const content =
    ChatHeader({
      avatarComponent: Avatar({}),
      dropdownComponent: Dropdown({
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
      }),
      name: 'Имя',
    }) +
    ChatMessages() +
    ChatFooter();

  return ChatTemplate({ content });
};
