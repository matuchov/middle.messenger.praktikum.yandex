import type { defaultProps } from '@/app/utils/Block/Block';
import type { Chatlist } from '@/features/Chatlist';
import type { Search } from '@/features/Search';
import type { MyLink } from '@/shared/MyLink';
import type CreateChat from '../ui/CreateChat/CreateChat';

export interface SidebarProps extends defaultProps {
  link?: MyLink;
  search?: Search;
  shatlist?: InstanceType<typeof Chatlist>;
  createChat?: InstanceType<typeof CreateChat>;
}
