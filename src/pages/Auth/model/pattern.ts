import type { AuthPatternsType } from './types';

export const AuthPatterns: AuthPatternsType = {
  login: {
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
  },
  registration: {
    inputs: [
      {
        inputStyle: 'column',
        inputType: 'text',
        label: 'Почта',
        name: 'email',
      },
      {
        inputStyle: 'column',
        inputType: 'text',
        label: 'Логин',
        name: 'login',
      },
      {
        inputStyle: 'column',
        inputType: 'text',
        label: 'Имя',
        name: 'first_name',
      },
      {
        inputStyle: 'column',
        inputType: 'text',
        label: 'Фамилия',
        name: 'second_name',
      },
      {
        inputStyle: 'column',
        inputType: 'password',
        label: 'Пароль',
        name: 'password',
      },
      {
        inputStyle: 'column',
        inputType: 'tel',
        label: 'Телефон',
        name: 'phone',
      },
    ],
    button: {
      btnText: 'Зарегистрироваться',
      btnType: 'submit',
      theme: 'default',
    },
    link: {
      linkText: 'Войти',
      linkClassName: 'auth__link',
      linkHref: '/login',
    },
  },
};
