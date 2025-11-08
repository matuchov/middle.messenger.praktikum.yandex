import { ChatlistData } from '../../model/ChatlistData';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import ChatlistTemplate from './template/Chatlist.mtmp';

export const Chatlist = () => {
  return ChatlistTemplate({
    chatlistRows: ChatlistData.map((el) => ChatListRow(el)).join(''),
  });
};
