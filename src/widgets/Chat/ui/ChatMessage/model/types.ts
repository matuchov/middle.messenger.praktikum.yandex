import type { defaultProps } from '@/app/utils/Block';

export const directions = {
  inbox: 'chat__message--inbox',
  sent: 'chat__message--sent',
};

export const types = {
  text: '',
  picture: 'chat__message--picture',
};

export interface ChatMessageProps extends defaultProps {
  messageText: string;
  type: keyof typeof types;
  direction: keyof typeof directions;
  src?: string;
}
