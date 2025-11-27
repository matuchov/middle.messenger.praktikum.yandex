import './Dropdown.css';
import { directions, type DropdownProps } from '../model/types';
import { dropdownTemplate, dropdownItemTemplate } from '../templates/Dropdown';

import { Block } from '@/app/utils/Block';

import { Templator } from '@/app/utils/TemplatorClass';

const tepmlate = new Templator(dropdownTemplate);
const tepmlateItem = new Templator(dropdownItemTemplate);

export class Dropdown extends Block<DropdownProps> {
  render() {
    const { direction = 'bottomLeft', icons = [], btnIconSrc = '', onclick = '' } = this.props;
    const directionClass = directions[direction];
    const iconsHTML = '';
    icons.map((el) => tepmlateItem.compile(el));
    return tepmlate.compile({ btnIconSrc, directionClass, items: iconsHTML, onclick });
  }
}
