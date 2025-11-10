import ChatHeaderTemlpate from './template/ChatHeader.mtmp';
import './Chatheader.css';

interface ChatHeaderProps {
  avatarComponent: string;
  dropdownComponent: string;
  name: string;
}

export const ChatHeader = ({ avatarComponent, dropdownComponent, name }: ChatHeaderProps) => {
  return ChatHeaderTemlpate({ avatarComponent, dropdownComponent, name });
};
