import type { Chat } from '@/widgets/Chat/';
import type { defaultProps } from '@/app/utils/Block/Block';
import type { Sidebar } from '@/widgets/Sidebar';

export interface ChatPageProps extends defaultProps {
  chat?: InstanceType<typeof Chat>;
  sidebar?: Sidebar;
}
