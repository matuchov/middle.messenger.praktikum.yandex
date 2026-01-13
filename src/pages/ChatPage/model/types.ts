import type { defaultProps } from '@/app/utils/Block';
import { type ChatType } from '@/widgets/Chat';
import type { Sidebar } from '@/widgets/Sidebar';

export interface ChatPageProps extends defaultProps {
  chat?: ChatType;
  sidebar?: Sidebar;
}
