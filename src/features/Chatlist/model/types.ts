import type { defaultProps } from '@/app/utils/Block';
import type { ChatListRow } from '../ui/ChatListRow/ChatlistRow';

export interface ChatlistProps extends defaultProps {
  chatlistRows?: ChatListRow[];
}
