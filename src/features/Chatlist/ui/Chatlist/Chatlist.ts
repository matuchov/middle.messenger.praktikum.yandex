import { ChatlistData } from '../../model/ChatlistData';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import { chatlistTemplate } from './template/Chatlist';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';

type ChatListT = {
}

const tepmlate = new Templator(chatlistTemplate);

export class Chatlist extends Block<ChatListT> {
  render() {
    return tepmlate.compile({ chatlistRows: this.compile(ChatListRow, ChatlistData!)
  }
}
