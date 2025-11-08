import './Dropdown.css';
import { directions, type DropdownProps } from '../model/types';
import DropdownTemplate from '../templates/Dropdown.mtmp';
import DropdownItemTemplate from '../templates/DropdownItem.mtmp';

export const Dropdown = ({
  direction = 'bottomLeft',
  icons = [],
  btnIconSrc = '',
  onclick = '',
}: DropdownProps) => {
  const directionClass = directions[direction];
  const iconsHTML = icons.map(DropdownItemTemplate).join('');

  return DropdownTemplate({
    btnIconSrc,
    directionClass,
    items: iconsHTML,
    onclick,
  });
};
