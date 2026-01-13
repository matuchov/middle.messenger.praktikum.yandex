import type { defaultProps } from '@/app/utils/Block';

export const directions = {
  inbox: 'chat__message--inbox',
  sent: 'chat__message--sent',
};

export const messageTypes = {
  text: '',
  picture: 'chat__message--picture',
} as const;

export interface ChatMessageProps extends defaultProps {
  messageText: string;
  type: keyof typeof messageTypes;
  direction: keyof typeof directions;
  src?: string;
  time?: string;
  author?: string;
}
