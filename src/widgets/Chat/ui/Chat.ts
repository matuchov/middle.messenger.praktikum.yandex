import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatTemplate } from '../template/Chat';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatFooter } from './ChatFooter/ChatFooter';
import './Chat.css';

const template = new Templator(ChatTemplate);

export class Chat extends Block<defaultProps> {
  init() {
    this.children.header = new ChatHeader({});
    this.children.messages = new ChatMessages({});
    this.children.footer = new ChatFooter({});
  }

  render() {
    return template.compile({
      header: this.getDom(this.children.header),
      messages: this.getDom(this.children.messages),
      footer: this.getDom(this.children.footer),
    });
  }
}
