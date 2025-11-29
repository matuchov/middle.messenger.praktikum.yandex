import type { defaultProps } from '@/app/utils/Block';
import type { Chat } from '@/widgets/Chat';
import type { Sidebar } from '@/widgets/Sidebar';

export interface ChatPageProps extends defaultProps {
  chat?: Chat;
  sidebar?: Sidebar;
}
