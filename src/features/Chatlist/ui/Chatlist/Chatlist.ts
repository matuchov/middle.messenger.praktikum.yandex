import type { defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import { ChatlistData } from '../../model/ChatlistData';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import { chatlistTemplate } from './template/Chatlist';

const tepmlate = new Templator(chatlistTemplate);

export class Chatlist extends Block<defaultProps> {
  render() {
    return tepmlate.compile({ chatlistRows: this.compile(ChatListRow, ChatlistData!) });
  }
}
