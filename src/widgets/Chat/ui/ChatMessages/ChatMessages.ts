import { ChatMessagesTemplate } from './template/ChatMessages';
import { messages } from './model/messages';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './ChatMessages.css';
import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';

const template = new Templator(ChatMessagesTemplate);

interface ChatMessagesProps extends defaultProps {
  messages?: ChatMessage[];
}

export class ChatMessages extends Block<ChatMessagesProps> {
  init() {
    this.props.messages = messages.map((el) => new ChatMessage(el));
  }

  render() {
    return template.compile({ messages: this.getDom(this.props.messages) });
  }
}
