interface icon {
  iconSrc: string;
  itemText: string;
  onclick: string;
}

export const directions = {
  topLeft: 'dropdown__container--top',
  topRight: 'dropdown__container--top dropdown__container--right',
  bottomLeft: 'dropdown__container--bottom',
  bottomRight: 'dropdown__container--bottom dropdown__container--right',
};

export interface DropdownProps {
  icons: icon[];
  btnIconSrc?: string;
  onclick?: string;
  direction: keyof typeof directions;
}
