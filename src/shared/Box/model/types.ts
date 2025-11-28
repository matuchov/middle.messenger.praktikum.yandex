import type { Block, defaultProps } from '@/app/utils/Block';

export interface BoxProps extends defaultProps {
  boxClass?: string;
  children?: Block<object>;
}
