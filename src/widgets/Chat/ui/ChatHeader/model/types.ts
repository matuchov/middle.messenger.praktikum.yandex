import type { IchatUser } from '@/app/store/storeType';
import type { defaultProps } from '@/app/utils/Block';
import type { Avatar } from '@/shared/Avatar';
import ChatAddUser from '../../ChatAddUser/ChatAddUser';

export interface ChatHeaderProps extends defaultProps {
  avatarComponent?: Avatar;
  addUser?: InstanceType<typeof ChatAddUser>;
  name?: string;
  chatUsers?: IchatUser[];
  chatId?: number | null;
}
