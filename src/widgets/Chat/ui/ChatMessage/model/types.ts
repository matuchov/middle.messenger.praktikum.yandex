export const directions = {
  inbox: 'chat__message--inbox',
  sent: 'chat__message--sent',
};

export const types = {
  text: '',
  picture: 'chat__message--picture',
};

export interface ChatMessageProps {
  messageText: string;
  type: keyof typeof types;
  direction: keyof typeof directions;
  src?: string;
}
