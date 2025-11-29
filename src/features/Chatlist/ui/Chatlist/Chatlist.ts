import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import { ChatlistData } from '../../model/ChatlistData';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import { chatlistTemplate } from './template/Chatlist';
import type { ChatlistProps } from '../../model/types';

const tepmlate = new Templator(chatlistTemplate);

export class Chatlist extends Block<ChatlistProps> {
  constructor() {
    const chatlistRows = ChatlistData.map((item) => new ChatListRow(item));
    super({ chatlistRows });
  }

  render() {
    const { chatlistRows } = this.children;
    return tepmlate.compile({ chatlistRows });
  }
}
