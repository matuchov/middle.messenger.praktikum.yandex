import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatTemplate } from '../template/Chat';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatFooter } from './ChatFooter/ChatFooter';
import './Chat.css';
import type { ChatProps } from '../model/types';

const template = new Templator(ChatTemplate);

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const header = new ChatHeader({});
    const messages = new ChatMessages({});
    const footer = new ChatFooter({});
    super({ ...props, header, messages, footer });
  }

  render() {
    const { header, messages, footer } = this.children;

    return template.compile({ header, messages, footer });
  }
}
