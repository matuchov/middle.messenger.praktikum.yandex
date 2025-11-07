import type { ChatMessageProps } from '../../ChatMessage/model/types';

export const messages: ChatMessageProps[] = [
  {
    messageText: `
    Перечень ссылок:<br/>
<br/>
    <a href="/profile">Профиль: /profile</a><br/>
    <a href="/changepass">Изменение пароля: /changepass</a><br/>
    <a href="/edit">Изменение профиля: /edit</a><br/>
    <a href="/login">Логин: /login</a><br/>
    <a href="/registration">Регистрация: /registration</a><br/>
    <a href="/AvatarUpload">Загрузка аватара: /AvatarUpload</a><br/>
    <a href="/500">Ошибка 500 /500</a><br/>
    <a href="/dsadsads">Ошибка 404 /500</a><br/>
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
