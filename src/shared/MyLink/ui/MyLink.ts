import type { MyLinkProps } from '../model/types';
import MyLinkTemlpate from '../template/MyLink.mtmp';

export const MyLink = ({ linkClassName = '', linkText = '', linkHref = '#' }: MyLinkProps) => {
  return MyLinkTemlpate({ linkClassName, linkText, linkHref });
};
