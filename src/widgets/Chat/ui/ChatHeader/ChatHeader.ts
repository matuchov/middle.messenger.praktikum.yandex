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
import ChatAddUser from '../ChatAddUser/ChatAddUser';
import { createResourcesLink } from '@/shared/utils/api/createResourcesLink';
import { MyLink } from '@/shared/MyLink';
const template = new Templator(ChatHeaderTemplate);
const chatUserTemplate = new Templator(User);

class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    const { chatAvatarSrc } = props;

    const avatar = new Avatar({ avatarSrc: createResourcesLink(chatAvatarSrc) });
    const avatarComponent = new MyLink({
      child: avatar,
      linkHref: '/chatavatarupload',
    });
    const addUser = new ChatAddUser({});

    super({ ...props, avatarComponent, addUser, avatar });
  }

  createUsersComponent(chatUsers: IchatUser[] | undefined, chatId?: number | null) {
    if (chatUsers && chatId) {
      return chatUsers.map((user) => {
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
        return chatUserTemplate.compile({ userName: user.id, deleteButton });
      });
    }
  }

  protected componentDidUpdate(_: ChatHeaderProps, newProps: ChatHeaderProps): void {
    const avatarSrc = newProps.chatAvatarSrc;
    this.children.avatar?.setProps({ avatarSrc: createResourcesLink(avatarSrc) });
    console.log(this.children.avatarComponent);
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
  const chatId = state.curentChatId;
  const chatAvatarSrc = state.chatlist?.find((chat) => chat.id === chatId)?.avatar;

  return {
    chatUsers: state.chatUsers,
    chatAvatarSrc,
    chatId,
  };
}

export default connect(ChatHeader, mapChatUsers);
