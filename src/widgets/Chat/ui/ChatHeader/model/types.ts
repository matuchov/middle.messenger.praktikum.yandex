import type { defaultProps } from '@/app/utils/Block';
import type { Avatar } from '@/shared/Avatar';
import type { Dropdown } from '@/shared/Dropdown';

export interface ChatHeaderProps extends defaultProps {
  avatarComponent?: Avatar;
  dropdownComponent?: Dropdown;
  name?: string;
}
