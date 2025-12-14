import { type ChatMessageProps } from './../ChatMessage/model/types';
import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatMessagesTemplate } from './template/ChatMessages';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './ChatMessages.css';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';
import { Loader } from '@/shared/Loader';

const template = new Templator(ChatMessagesTemplate);

interface ChatMessagesProps extends defaultProps {
  messages?: ChatMessage[];
  messagesData?: ChatMessageProps[];
  isLoading?: boolean;
}

class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    super({ ...props });
  }

  protected componentDidUpdate(oldProps: ChatMessagesProps, newProps: ChatMessagesProps): boolean {
    this.children.messages = newProps.messagesData?.map((el) => new ChatMessage(el));
    return true;
  }

  render() {
    const { isLoading } = this.props;
    const { messages } = this.children;
    if (isLoading) return new Loader({}).getContent()!;
    return template.compile({ messages });
  }
}

function mapMessages(state: IStore): Partial<ChatMessagesProps> {
  const messages = state.messages;
  const isLoading = state.isChatLoading;
  const messagesData = messages?.map((ms) => {
    const direction = ms.user_id === state.user?.id ? 'sent' : 'inbox';
    const time = new Date(ms.time).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const author = state.chatUsers?.find((user) => user.id === ms.user_id)?.login;
    return {
      messageText: ms.content,
      direction,
      type: 'text',
      time,
      author,
    };
  });
  return {
    messagesData,
    isLoading,
  };
}

export default connect(ChatMessages, mapMessages);
