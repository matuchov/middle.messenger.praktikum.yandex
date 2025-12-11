import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatTemplate } from '../template/Chat';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatFooter } from './ChatFooter/ChatFooter';
import './Chat.css';
import type { ChatProps } from '../model/types';
import { ChatApi } from '../ChatApi/ChatApi';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';

const template = new Templator(ChatTemplate);
const api = new ChatApi();

class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const header = new ChatHeader({});
    const messages = new ChatMessages({});
    const footer = new ChatFooter({});
    super({ ...props, header, messages, footer });
  }

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    console.log(newProps);
    api.openSocket(newProps.curentChatId);
    return true;
  }

  render() {
    const { header, messages, footer } = this.children;

    return template.compile({ header, messages, footer });
  }
}

function mapChatID(state: IStore) {
  return {
    curentChatId: state.curentChatId,
  };
}

export default connect(Chat, mapChatID);
