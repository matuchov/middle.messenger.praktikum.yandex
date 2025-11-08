import { directions, types, type ChatMessageProps } from './model/types';
import ChatMessageTemlpate from './template/ChatMessage.mtmp';
import ChatMessagePictureTemlpate from './template/ChatMessagePicture.mtmp';

import './ChatMessage.css';

export const ChatMessage = ({
  messageText = '',
  type,
  direction,
  src,
}: ChatMessageProps) => {
  const messageType = ' ' + directions[direction] + ' ' + types[type];

  if (src) {
    return ChatMessagePictureTemlpate({ messageType, src });
  }

  return ChatMessageTemlpate({ messageText, messageType });
};
