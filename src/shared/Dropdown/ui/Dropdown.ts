import './Dropdown.css';
import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { directions, type DropdownProps } from '../model/types';
import { dropdownTemplate } from '../templates/Dropdown';
import { DropdownItem } from './DropdownItem/DropdownTtem';

const tepmlate = new Templator(dropdownTemplate);

export class Dropdown extends Block<DropdownProps> {
  constructor(props: DropdownProps) {
    const { items } = props;
    const itemsBlock = items.map((el) => new DropdownItem(el));

    super({ ...props, itemsBlock });
  }

  render() {
    const { direction = 'bottomLeft', btnIconSrc = '' } = this.props;
    const { itemsBlock } = this.children;

    const directionClass = directions[direction];
    return tepmlate.compile({ btnIconSrc, directionClass, items: itemsBlock });
  }
}
