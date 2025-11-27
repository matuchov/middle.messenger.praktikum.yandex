import { Avatar } from '@/shared/Avatar/';
import './ChatlistRow.css';
import { chatListRowTemplate } from './template/ChatlistRow';
import { Block, type defaultProps } from '@/app/utils/Block';

import { Templator } from '@/app/utils/TemplatorClass';

export interface ChatListRowProps extends defaultProps {
  name: string;
  messageText: string;
  time: string;
  counter: string;
  avatarSrc: string;
}

const tepmlate = new Templator(chatListRowTemplate);

export class ChatListRow extends Block<ChatListRowProps> {
  render() {
    const {
      name = 'name',
      messageText = 'messageText',
      time = '11:14',
      counter = '222',
      avatarSrc,
    } = this.props;
    return tepmlate.compile({
      Avatar: new Avatar({ avatarSrc }),
      counter,
      messageText,
      name,
      time,
    });
  }
}
