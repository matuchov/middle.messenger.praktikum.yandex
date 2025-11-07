import ChatMessagesTemlpate from './template/ChatMessages.mtmp';
import { messages } from './model/messages';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './ChatMessages.css';

export const ChatMessages = () => {
  messages.map(ChatMessage);

  return ChatMessagesTemlpate({ messages: messages.map(ChatMessage).join('') });
};
