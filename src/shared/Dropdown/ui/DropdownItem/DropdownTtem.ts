import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { dropdownItemTemplate } from '../../templates/Dropdown';

const tepmlateItem = new Templator(dropdownItemTemplate);

interface DropdownItemProps extends defaultProps {
  itemSrc?: string;
  itemText?: string;
}

export class DropdownItem extends Block<DropdownItemProps> {
  render() {
    const { itemSrc = '', itemText = '' } = this.props;
    return tepmlateItem.compile({ itemSrc, itemText });
  }
}
