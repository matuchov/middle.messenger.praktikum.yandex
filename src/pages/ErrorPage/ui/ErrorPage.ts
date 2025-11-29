import { MyLink } from '@/shared/MyLink';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { ErrorPageTemlpate } from '../template/ErrorPage.ts';
import type { ErrorPageProps } from '../model/types';
import './ErrorPage.css';

const template = new Templator(ErrorPageTemlpate);

export class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    const link = new MyLink({
      linkClassName: 'error-page__link',
      linkText: 'Назад к чатам',
      linkHref: '/',
    });
    super({ ...props, link });
  }

  render() {
    const { error } = this.props;
    const { link } = this.children;
    return template.compile({
      Error: error,
      errorText: error === '404' ? 'Не туда попали' : 'Мы уже фиксим',
      linkComponent: link,
    });
  }
}
