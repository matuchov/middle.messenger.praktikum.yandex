import { Dropdown } from '@/shared/Dropdown';
import { ChatFooterTemplate } from './template/ChatFooter';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block, type defaultProps } from '@/app/utils/Block';
import './ChatFooter.css';

const template = new Templator(ChatFooterTemplate);

export class ChatFooter extends Block<{ dropdownComponent: Dropdown } & defaultProps> {
  init() {
    this.children.dropdownComponent = new Dropdown({
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
  }

  render() {
    return template.compile({ dropdownComponent: this.getDom(this.children.dropdownComponent) });
  }
}
