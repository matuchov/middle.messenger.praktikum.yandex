import type { MyInputProps } from '@/shared/MyInput';
import type { MyButtonProps } from '@/shared/MyButton';
import type { MyLinkProps } from '@/shared/MyLink';
import type { pageTypes } from './types';

type ProfilePattern = {
  inputs: MyInputProps[];
  submitBtn?: MyButtonProps;
  links?: MyLinkProps[];
  disabled: boolean;
};
type ProfilePatternsType = Record<pageTypes, ProfilePattern>;

const profileInputs: MyInputProps[] = [
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
];

export const ProfilePatterns: ProfilePatternsType = {
  edit: {
    inputs: profileInputs,
    submitBtn: { btnText: 'Сохранить', btnType: 'submit' },
    disabled: false,
    links: [
      {
        linkText: 'Отмена',
        linkHref: '/profile',
        linkClassName: 'profile__link profile__link_cancel',
      },
    ],
  },
  default: {
    inputs: profileInputs,
    disabled: true,
    links: [
      {
        linkText: 'Изменить данные',
        linkHref: '/edit',
        linkClassName: 'profile__link',
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
  },
  changepass: {
    inputs: [
      {
        name: 'oldPassword',
        label: 'Старый пароль',
        inputType: 'password',
        inputStyle: 'row',
      },
      {
        name: 'newPassword',
        label: 'Новый пароль',
        inputType: 'password',
        inputStyle: 'row',
      },
    ],
    disabled: false,
    submitBtn: { btnText: 'Сохранить', btnType: 'submit' },
  },
};
