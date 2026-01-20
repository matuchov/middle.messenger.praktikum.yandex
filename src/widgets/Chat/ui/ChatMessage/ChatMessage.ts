import { Block } from '@/app/utils/Block/Block';
import { Templator } from '@/app/utils/Templator/TemplatorClass';
import { directions, messageTypes, type ChatMessageProps } from './model/types';
import { ChatMessageTemplate } from './template/ChatMessage';
import { ChatMessagePictureTemplate } from './template/ChatMessagePicture';
import './ChatMessage.css';

const messageTemplate = new Templator(ChatMessageTemplate);
const messagePictureTemplate = new Templator(ChatMessagePictureTemplate);

export class ChatMessage extends Block<ChatMessageProps> {
  render() {
    const { messageText = '', type, direction, src, time, author } = this.props;
    const messageType = ` ${directions[direction]} ${messageTypes[type]}`;

    if (src) {
      return messagePictureTemplate.compile({ messageType, src, time });
    }

    return messageTemplate.compile({ messageText, messageType, time, author });
  }
}
