import type { ChatMessageProps } from '../../ChatMessage/model/types';

export const messages: ChatMessageProps[] = [
  {
    messageText: `
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularis
    `,
    direction: 'inbox',
    type: 'text',
  },
  {
    messageText: '',
    direction: 'inbox',
    type: 'text',
    src: '/assets/image.png',
  },
  {
    messageText: 'Круто!',
    direction: 'sent',
    type: 'text',
  },
];
