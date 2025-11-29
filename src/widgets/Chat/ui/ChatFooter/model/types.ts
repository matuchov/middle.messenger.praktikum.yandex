import type { defaultProps } from '@/app/utils/Block';
import type { Form } from '@/entities/Form';
import type { Dropdown } from '@/shared/Dropdown';
import type { MyInput } from '@/shared/MyInput';

export interface ChatFooterProps extends defaultProps {
  dropdownComponent?: Dropdown;
  inputs?: MyInput[];
  form?: Form;
}
