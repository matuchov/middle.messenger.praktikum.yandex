import type { defaultProps } from '@/app/utils/Block';

export interface BoxProps extends defaultProps {
  boxClass?: string;
  children?: HTMLElement | null | DocumentFragment;
}
