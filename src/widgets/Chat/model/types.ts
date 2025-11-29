import type { defaultProps } from '@/app/utils/Block';
import type { ChatFooter } from '../ui/ChatFooter/ChatFooter';
import type { ChatHeader } from '../ui/ChatHeader/ChatHeader';
import type { ChatMessages } from '../ui/ChatMessages/ChatMessages';

export interface ChatProps extends defaultProps {
  header?: ChatHeader;
  messages?: ChatMessages;
  footer?: ChatFooter;
}
