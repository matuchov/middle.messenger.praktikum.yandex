import { Chatlist } from '@/features/Chatlist/';
import { MyLink } from '@/shared/MyLink';
import { Search } from '@/features/Search';
import SidebarTemplate from '../template/SidebarTemplate.mtmp';
import './Sidebar.css';

export const Sidebar = () => {
  return SidebarTemplate({
    link: MyLink({ linkText: 'Профиль', linkHref: '/profile' }),
    search: Search({ value: '' }),
    shatlist: Chatlist(),
  });
};
