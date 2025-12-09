import type { defaultProps } from '@/app/utils/Block';
import type { ChatListRow } from '../ui/ChatListRow/ChatlistRow';

export interface ChatlistProps extends defaultProps {
  chatlistRows?: ChatListRow[];
  chatlist?: IChatlistResponce[];
}

export interface IChatlistResponce {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}
