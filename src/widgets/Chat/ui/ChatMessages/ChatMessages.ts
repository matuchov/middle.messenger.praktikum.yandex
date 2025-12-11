import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatMessagesTemplate } from './template/ChatMessages';
import { messages as messagesData } from './model/messages';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './ChatMessages.css';

const template = new Templator(ChatMessagesTemplate);

interface ChatMessagesProps extends defaultProps {
  messages?: ChatMessage[];
}

export class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    const messages = messagesData.map((el) => new ChatMessage(el));
    super({ ...props, messages });
  }

  render() {
    const { messages } = this.children;
    return template.compile({ messages });
  }
}
