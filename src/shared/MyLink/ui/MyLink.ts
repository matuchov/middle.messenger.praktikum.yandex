import type { MyLinkProps } from '../model/types';
import MyLinkTemlpate from '../template/MyLink.mtmp';
import './MyLink.css';

export const MyLink = ({
  linkClassName = '',
  linkText = '',
  linkHref = '#',
}: MyLinkProps) => {
  return MyLinkTemlpate({ linkClassName, linkText, linkHref });
};
