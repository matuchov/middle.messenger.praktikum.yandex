import type { ProfilePattern } from '@/widgets/Profile';
import { SettingsController } from './controller';

const controller = new SettingsController();

export const settingsPattern: ProfilePattern = {
  inputs: [
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Почта',
      name: 'email',
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Логин',
      name: 'login',
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Имя',
      name: 'first_name',
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Фамилия',
      name: 'second_name',
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Имя в чате',
      name: 'display_name',
    },
    {
      inputStyle: 'row',
      inputType: 'tel',
      label: 'Телефон',
      name: 'phone',
    },
  ],
  links: [
    {
      linkText: 'Изменить данные',
      linkHref: '#',
      linkClassName: 'profile__link',
      events: {
        click: {
          listener: (e) => {
            e.preventDefault();
            controller.setEdit();
          },
        },
      },
    },
    {
      linkText: 'Изменить пароль',
      linkHref: '/changepass',
      linkClassName: 'profile__link',
    },
    {
      linkText: 'Выйти',
      linkHref: '#',
      linkClassName: 'profile__link profile__link_cancel',
    },
  ],
};
