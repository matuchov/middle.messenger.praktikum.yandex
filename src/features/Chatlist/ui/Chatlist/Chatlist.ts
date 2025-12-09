import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import { ChatlistData } from '../../model/ChatlistData';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import { chatlistTemplate } from './template/Chatlist';
import type { ChatlistProps } from '../../model/types';
import { ChatlisController } from '../../model/Controller';

const tepmlate = new Templator(chatlistTemplate);
const chatlisController = new ChatlisController();

export class Chatlist extends Block<ChatlistProps> {
  constructor(props: ChatlistProps) {
    const chatlistRows = ChatlistData.map((item) => new ChatListRow(item));
    chatlisController.getChats();
    super({ ...props, chatlistRows });
  }

  render() {
    const { chatlistRows } = this.children;
    return tepmlate.compile({ chatlistRows });
  }
}
