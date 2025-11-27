import { MyLink } from '@/shared/MyLink';
import ErrorPageTemlpate from '../template/ErrorPage.mtmp';
import './ErrorPage.css';
import type { ErrorPageProps } from '../model/types';

export const ErrorPage = ({ error }: ErrorPageProps) => {
  return ErrorPageTemlpate({
    Error: error,
    errorText: error === '404' ? 'Не туда попали' : 'Мы уже фиксим',
    linkComponent: new MyLink({
      linkClassName: 'error-page__link',
      linkText: 'Назад к чатам',
      linkHref: '/',
    }),
  });
};
