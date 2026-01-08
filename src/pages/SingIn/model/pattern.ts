import type { PatternType } from './types';

export const SingInPatterns: PatternType = {
  inputs: [
    {
      inputStyle: 'column',
      inputType: 'text',
      label: 'Логин',
      name: 'login',
    },

    {
      inputStyle: 'column',
      inputType: 'password',
      label: 'Пароль',
      name: 'password',
    },
  ],
  button: { btnText: 'Войти', btnType: 'submit', theme: 'default' },

  link: {
    linkText: 'Зарегистрироваться',
    linkClassName: 'auth__link',
    linkHref: '/registration',
  },
};
