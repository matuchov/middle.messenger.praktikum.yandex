import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatMessagesTemplate } from './template/ChatMessages';
import { messages, messages as messagesData } from './model/messages';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './ChatMessages.css';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';

const template = new Templator(ChatMessagesTemplate);

interface ChatMessagesProps extends defaultProps {
  messages?: ChatMessage[];
  messagesData?: ChatMessage[];
}

class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    const messages = [];
    super({ ...props, messages });
  }

  protected componentDidUpdate(oldProps: ChatMessagesProps, newProps: ChatMessagesProps): boolean {
    this.children.messages = newProps.messagesData?.map((el) => new ChatMessage(el));
    return true;
  }

  render() {
    const { messages } = this.children;
    return template.compile({ messages });
  }
}

function mapMessages(state: IStore): Partial<ChatMessagesProps> {
  const messages = state.messages;
  const messagesProps = messages?.map((ms) => {
    return {
      messageText: ms.content,
      direction: ms.type,
      type: ms.type,
    };
  });
  return {
    messagesData: messagesProps,
  };
}

export default connect(ChatMessages, mapMessages);
