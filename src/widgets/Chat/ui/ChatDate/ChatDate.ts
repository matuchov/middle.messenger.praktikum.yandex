import ChatDateTemlpate from './template/ChatDate.mtmp';
import './ChatDate.css';

type ChatDateProps = {
  date: string;
};

export const ChatDate = ({ date }: ChatDateProps) => {
  return ChatDateTemlpate({ date });
};
