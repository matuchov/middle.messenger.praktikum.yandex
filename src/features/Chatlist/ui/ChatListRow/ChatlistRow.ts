import { Avatar } from '@/shared/Avatar/';
import './ChatlistRow.css';
import ChatListRowTemplate from './template/ChatlistRow.mtmp';

export type ChatListRowProps = {
  name: string;
  messageText: string;
  time: string;
  counter: string;
  avatarSrc: string;
};

export const ChatListRow = ({
  name = 'name',
  messageText = 'messageText',
  time = '11:14',
  counter = '222',
  avatarSrc,
}: ChatListRowProps) =>
  ChatListRowTemplate({
    Avatar: Avatar({ avatarSrc }),
    counter,
    messageText,
    name,
    time,
  });
