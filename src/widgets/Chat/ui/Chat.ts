import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';
import { ChatTemplate } from '../template/Chat';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMessages from './ChatMessages/ChatMessages';
import { ChatFooter } from './ChatFooter/ChatFooter';
import type { ChatProps } from '../model/types';
import controller from '../model/ChatController';
import './Chat.css';
import { Loader } from '@/shared/Loader';
import { BlankChat } from '../template/Blank';

const template = new Templator(ChatTemplate);
const blankTemplate = new Templator(BlankChat);

class ChatClass extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const header = new ChatHeader({});
    const messages = new ChatMessages({});
    const footer = new ChatFooter({});

    super({ ...props, header, messages, footer });
  }

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (oldProps.curentChatId === newProps.curentChatId) {
      return false;
    }
    controller.clearMessages();
    controller.openSocket(newProps.curentChatId);
    return true;
  }

  render() {
    const { header, messages, footer } = this.children;
    const { isLoading, curentChatId } = this.props;
    if (!curentChatId) return blankTemplate.compile({});
    if (isLoading) return new Loader({}).getContent()!;
    return template.compile({ header, messages, footer });
  }
}

function mapChatID(state: IStore) {
  return {
    curentChatId: state.curentChatId,
    isLoading: state.isChatLoading,
  };
}

export default connect(ChatClass, mapChatID);

export type ChatType = ChatClass;
