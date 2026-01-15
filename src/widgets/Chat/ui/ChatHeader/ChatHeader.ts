import { Avatar } from '@/shared/Avatar';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import type { IchatUser, IStore } from '@/app/store/storeType';
import { ChatHeaderTemplate } from './template/ChatHeader';
import type { ChatHeaderProps } from './model/types';
import { User } from './template/User';
import './Chatheader.css';
import { connect } from '@/shared/utils/connect/model/connect';
import { MyButtonBlock } from '@/shared/MyButtonBlock';
import ChatController from '../../model/ChatController';
import { ChatAddUser } from '../ChatAddUser/ChatAddUser';
const template = new Templator(ChatHeaderTemplate);
const chatUserTemplate = new Templator(User);

class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    const avatarComponent = new Avatar({});
    const addUser = new ChatAddUser({});

    super({ ...props, avatarComponent, addUser });
  }

  createUsersComponent(chatUsers: IchatUser[] | undefined, chatId?: number | null) {
    if (chatUsers && chatId) {
      return chatUsers.map((user) => {
        const avatarComponent = new Avatar({ avatarSrc: user.avatar });
        const deleteButton = new MyButtonBlock({
          btnType: 'button',
          theme: 'clear',
          btnText: '❌',
          events: {
            click: {
              listener: () => {
                ChatController.deleteUser(chatId, user.id);
              },
            },
          },
        });
        return chatUserTemplate.compile({ userName: user.id, deleteButton, avatarComponent });
      });
    }
  }

  render() {
    const { name, chatUsers, chatId } = this.props;
    const { avatarComponent, addUser } = this.children;
    const chatUsersComponent = this.createUsersComponent(chatUsers, chatId);
    return template.compile({
      name,
      avatarComponent,
      chatUsersComponent,
      addUser,
    });
  }
}

function mapChatUsers(state: IStore) {
  return {
    chatUsers: state.chatUsers,
    chatId: state.curentChatId,
  };
}

export default connect(ChatHeader, mapChatUsers);
