import type { Block, defaultProps } from '@/app/utils/Block';

export interface MyLinkProps extends defaultProps {
  linkClassName?: string;
  linkText: string;
  linkHref?: string;
  child?: Block<object>;
}
