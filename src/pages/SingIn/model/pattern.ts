import { validators } from '@/shared/utils/validation/Validate';
import type { PatternType } from './types';

export const SingInPatterns: PatternType = {
  inputs: [
    {
      inputStyle: 'column',
      inputType: 'text',
      label: 'Логин',
      name: 'login',
      validateRules: [validators.required()],
    },

    {
      inputStyle: 'column',
      inputType: 'password',
      label: 'Пароль',
      name: 'password',
      validateRules: [validators.required()],
    },
  ],
  button: { btnText: 'Войти', btnType: 'submit', theme: 'default' },

  link: {
    linkText: 'Зарегистрироваться',
    linkClassName: 'auth__link',
    linkHref: '/registration',
  },
};
