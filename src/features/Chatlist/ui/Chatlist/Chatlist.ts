import { Templator } from '@/app/utils/TemplatorClass';
import { Block } from '@/app/utils/Block';
import { ChatListRow } from '../ChatListRow/ChatlistRow';
import { chatlistTemplate } from './template/Chatlist';
import type { ChatlistProps } from '../../model/types';
import { ChatlisController } from '../../model/Controller';
import type { IStore } from '@/app/store/storeType';
import { connect } from '@/shared/utils/connect/model/connect';
import { Loader } from '@/shared/Loader';

const tepmlate = new Templator(chatlistTemplate);
const chatlisController = new ChatlisController();

class Chatlist extends Block<ChatlistProps> {
  constructor(props: ChatlistProps) {
    chatlisController.getChats();
    props.chatlistRows = new Loader({});
    super({ ...props });
  }
  protected componentDidUpdate(oldProps: ChatlistProps, newProps: ChatlistProps): boolean {
    const { chatlist } = newProps;
    if (chatlist) {
      this.children.chatlistRows = chatlist.map(
        (el) =>
          new ChatListRow({
            avatarSrc: el.avatar,
            counter: el.unread_count.toString(),
            messageText: el.last_message?.content || 'нет сообщений',
            name: el.last_message?.user?.first_name || '',
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
    return true;
  }

  render() {
    const { chatlistRows } = this.children;
    return tepmlate.compile({ chatlistRows });
  }
}

function mapUserToProps(state: IStore) {
  return {
    chatlist: state.chatlist,
  };
}

export default connect(Chatlist, mapUserToProps);
