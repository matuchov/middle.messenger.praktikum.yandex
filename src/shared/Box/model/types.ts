import type { Block, defaultProps } from '@/app/utils/Block/Block';

type children = Block<object> | HTMLElement | DocumentFragment | undefined | null;

export interface BoxProps extends defaultProps {
  boxClass?: string;
  children?: children | children[];
}
