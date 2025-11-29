import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { directions, types, type ChatMessageProps } from './model/types';
import { ChatMessageTemplate } from './template/ChatMessage';
import { ChatMessagePictureTemplate } from './template/ChatMessagePicture';
import './ChatMessage.css';

const messageTemplate = new Templator(ChatMessageTemplate);
const messagePictureTemplate = new Templator(ChatMessagePictureTemplate);

export class ChatMessage extends Block<ChatMessageProps> {
  render() {
    const { messageText = '', type, direction, src } = this.props;
    const messageType = ` ${directions[direction]} ${types[type]}`;
    if (src) {
      return messagePictureTemplate.compile({ messageType, src });
    }

    return messageTemplate.compile({ messageText, messageType });
  }
}
