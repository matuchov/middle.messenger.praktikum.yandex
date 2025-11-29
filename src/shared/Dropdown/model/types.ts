import type { defaultProps } from '@/app/utils/Block';
import type { DropdownItem } from '../ui/DropdownItem/DropdownTtem';

interface item {
  itemSrc: string;
  itemText: string;
}

export const directions = {
  topLeft: 'dropdown__container--top',
  topRight: 'dropdown__container--top dropdown__container--right',
  bottomLeft: 'dropdown__container--bottom',
  bottomRight: 'dropdown__container--bottom dropdown__container--right',
};

export interface DropdownProps extends defaultProps {
  items: item[];
  itemsBlock?: DropdownItem[];
  btnIconSrc?: string;
  onclick?: string;
  direction: keyof typeof directions;
}
