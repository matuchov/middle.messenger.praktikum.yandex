import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import { chatlistTemplate } from './template/Chatlist';
import type { ChatlistProps, IChatlistResponce } from '../../model/types';
import { ChatlisController } from '../../model/Controller';
import type { IStore } from '@/app/store/storeType';
import { connect } from '@/shared/utils/connect/model/connect';
import { Loader } from '@/shared/Loader';
import { createResourcesLink } from '@/shared/utils/api/createResourcesLink';

const tepmlate = new Templator(chatlistTemplate);
const chatlisController = new ChatlisController();

class Chatlist extends Block<ChatlistProps> {
  constructor(props: ChatlistProps) {
    props.chatlistRows = new Loader({});
    super({ ...props });
  }

  createChatlist(chatlist: IChatlistResponce[]) {
    return chatlist.map(
      (el) =>
        new ChatListRow({
          avatarSrc: createResourcesLink(el.avatar),
          counter: el.unread_count.toString(),
          messageText: el.last_message?.content || 'нет сообщений',
          name: el.title || '',
          time: el.last_message?.time ? new Date(el.last_message?.time).toLocaleTimeString() : '',
          events: {
            click: {
              listener: () => {
                chatlisController.setCurentChat(el.id);
              },
            },
          },
        })
    );
  }

  render() {
    const { chatlist } = this.props;
    if (!chatlist) return tepmlate.compile({ chatlistRows: this.children.chatlistRows });
    const chatlistRows = this.createChatlist(chatlist);
    return tepmlate.compile({ chatlistRows });
  }
}

function mapUserToProps(state: IStore) {
  return {
    chatlist: state.chatlist,
  };
}

export default connect(Chatlist, mapUserToProps);
