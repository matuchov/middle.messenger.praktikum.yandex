import { Avatar } from '@/shared/Avatar/';
import './ChatlistRow.css';
import { Block, type defaultProps } from '@/app/utils/Block';

import { Templator } from '@/app/utils/TemplatorClass';
import { chatListRowTemplate } from './template/ChatlistRow';
import { createResourcesLink } from '@/shared/utils/api/createResourcesLink';

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
    const { name = '', messageText = '', time = '', counter = '', avatarSrc } = this.props;
    const src = createResourcesLink(avatarSrc);
    return tepmlate.compile({
      Avatar: new Avatar({ avatarSrc: src }),
      counter,
      messageText,
      name,
      time,
    });
  }
}
