import { validators } from '@/shared/utils/validation/Validate';
import type { PatternType } from '@/widgets/Auth/model/types';

export const SingUpPattern: PatternType = {
  inputs: [
    {
      inputStyle: 'column',
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
      inputStyle: 'column',
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
      inputStyle: 'column',
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
      inputStyle: 'column',
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
      inputStyle: 'column',
      inputType: 'password',
      label: 'Пароль',
      name: 'password',
      validateRules: [
        validators.required(),
        validators.minLength(8),
        validators.maxLength(40),
        validators.pattern(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква'),
        validators.pattern(/\d/, 'Должна быть хотя бы одна цифра'),
      ],
    },
    {
      inputStyle: 'column',
      inputType: 'tel',
      label: 'Телефон',
      name: 'phone',
      validateRules: [validators.required(), validators.phone()],
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
};
