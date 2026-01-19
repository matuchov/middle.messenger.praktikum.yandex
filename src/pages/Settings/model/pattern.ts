import { SessionController } from '@/entities/Session';
import type { ProfilePattern } from '@/widgets/Profile';
import { SettingsController } from './controller';
import { validators } from '@/shared/utils/validation/Validate';

const controller = new SettingsController();
const sessionController = new SessionController();

export const settingsPattern: ProfilePattern = {
  inputs: [
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Почта',
      name: 'email',
      validateRules: [
        validators.required(),
        validators.pattern(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Некорректный email'
        ),
      ],
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Логин',
      name: 'login',
      validateRules: [
        validators.required(),
        validators.minLength(3),
        validators.maxLength(20),
        validators.pattern(/^[a-zA-Z0-9\-_]+$/, 'Только латиница, цифры, дефис и подчеркивание'),
        validators.notOnlyNumbers(),
      ],
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Имя',
      name: 'first_name',
      validateRules: [
        validators.required(),
        validators.capitalized(),
        validators.pattern(/^[A-ZА-ЯЁa-zа-яё-]+$/, 'Только буквы и дефис'),
      ],
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Фамилия',
      name: 'second_name',
      validateRules: [
        validators.required(),
        validators.capitalized(),
        validators.pattern(/^[A-ZА-ЯЁa-zа-яё-]+$/, 'Только буквы и дефис'),
      ],
    },
    {
      inputStyle: 'row',
      inputType: 'text',
      label: 'Имя в чате',
      name: 'display_name',
      validateRules: [
        validators.required(),
        validators.minLength(3),
        validators.maxLength(20),
        validators.pattern(/^[a-zA-Z0-9\-_]+$/, 'Только латиница, цифры, дефис и подчеркивание'),
      ],
    },
    {
      inputStyle: 'row',
      inputType: 'tel',
      label: 'Телефон',
      name: 'phone',
      validateRules: [validators.required(), validators.phone()],
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
      linkText: 'К чатам',
      linkHref: '/messenger',
      linkClassName: 'profile__link',
    },
    {
      linkText: 'Выйти',
      linkHref: '#',
      linkClassName: 'profile__link profile__link_cancel',
      events: {
        click: {
          listener: (e) => {
            e.preventDefault();
            sessionController.logout();
          },
        },
      },
    },
  ],
  submitBtn: { btnText: 'Сохранить', btnType: 'submit', theme: 'default' },
};
