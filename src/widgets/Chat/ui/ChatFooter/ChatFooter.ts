import { Dropdown } from '@/shared/Dropdown';
import ChatFooterTemlpate from './template/ChatFooter.mtmp';
import './ChatFooter.css';

const dropdownComponent = new Dropdown({
  direction: 'topLeft',
  icons: [
    { iconSrc: '/assets/fileIcon.svg', itemText: 'Файл', onclick: '' },
    {
      iconSrc: '/assets/mediaIcon.svg',
      itemText: 'Фото или Видео',
      onclick: '',
    },
    {
      iconSrc: '/assets/locationIcon.svg',
      itemText: 'Локация',
      onclick: '',
    },
  ],
  btnIconSrc: '/assets/clipIcon.svg',
});

export const ChatFooter = () => {
  return ChatFooterTemlpate({ dropdownComponent, onclickSendBtn: '' });
};
