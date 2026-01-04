import type { defaultProps } from '@/app/utils/Block';
import type { Chatlist } from '@/features/Chatlist';
import type { Search } from '@/features/Search';
import type { MyButtonBlock } from '@/shared/MyButtonBlock';
import type { MyLink } from '@/shared/MyLink';

export interface SidebarProps extends defaultProps {
  link?: MyLink;
  search?: Search;
  shatlist?: typeof Chatlist;
  addChatBtn?: MyButtonBlock;
}
