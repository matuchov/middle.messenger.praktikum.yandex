import { Block } from '@/app/utils/Block';

const checks = {
  //   length: (min: number, max: number) => {
  //     return (value: string) => {
  //       if (!value && !value.length) {
  //         return 'поле не должно быть пустым';
  //       }
  //       if (value.length > max) {
  //         return `максимум ${max} символов`;
  //       }
  //       if (value.length < min) {
  //         return `минимум ${min} символов`;
  //       }
  //       return undefined;
  //     };
  //   },
  empty: (value: string) => {
    if (value.length) return undefined;
    return `поле не заполнено`;
  },
  spaces: (value: string) => {
    const match = value.match(' ');
    if (match) {
      return `поле не должно содержать пробелы`;
    }
    return undefined;
  },
  capital: (value: string) => {
    const capital = /^[A-ZА-ЯЁ]/;
    const matchCapital = value.match(capital);
    if (!matchCapital) {
      return 'должно начинаться с большой буквы';
    }
    return undefined;
  },
  name: (value: string) => {
    const regex = /[a-zA-Zа-яА-ЯёЁ]/g;
    const result = value.replace(regex, '');
    if (result) {
      return `поле должно содержать только буквы, недопускаются символы "${result}"`;
    }
    return undefined;
  },
  login: (value: string) => {
    const onlyNumbers = /^\d+$/;
    if (value.match(onlyNumbers)) {
      return `поле содержит только цифры`;
    }
    const regex = /[a-zA-Z0-9-_]/g;
    const result = value.replace(regex, '');
    if (result) {
      return `допускаются только латинские буквы, символы "-" "_", недопускаются символы "${result}"`;
    }
    return undefined;
  },
  email: (value: string) => {
    const regex = /^[a-zA-Z0-9\-_.]+@[a-zA-Z0-9\-_]+\.[a-zA-Z]{2,}$/;
    if (!value.match(regex)) {
      return `введите e-mail формата examle@mailbox.com`;
    }
    return undefined;
  },
  password: (value: string) => {
    const regex = /^(?=.*\d)(?=.*[A-Z])[^\s]+$/;
    if (!regex.test(value)) {
      return `в пароле должна содержаться хотя бы одна заглавная буква и цифра`;
    }
    return undefined;
  },
  phone: (value: string) => {
    const regex = /^\+\d+/;
    if (!regex.test(value)) {
      return `телефон должен быть в формате +7987654321`;
    }
    return undefined;
  },
};

const rules: Record<string, (keyof typeof checks)[]> = {
  first_name: ['capital', 'spaces', 'name', 'empty'],
  second_name: ['capital', 'spaces', 'name', 'empty'],
  login: ['login', 'empty'],
  email: ['email', 'empty'],
  password: ['password', 'spaces', 'empty'],
  phone: ['phone', 'empty'],
};

export const validateInput = (inputName: string, value: string) => {
  if (!inputName || !rules[inputName]) return '';
  const errors: string[] = [];
  rules[inputName].forEach((check) => {
    const error = checks[check](value);
    if (error) errors.push(error);
  });

  return errors.join(', ');
};
