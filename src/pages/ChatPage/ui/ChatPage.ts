import { Chat } from '@/widgets/Chat/';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { ChatPageTemlpate } from '../template/ChatPage';
import type { ChatPageProps } from '../model/types';

const template = new Templator(ChatPageTemlpate);

export class ChatPage extends Block<ChatPageProps> {
  constructor(props: defaultProps) {
    const chat = new Chat({});
    const sidebar = new Sidebar({});
    super({ ...props, chat, sidebar });
  }

  render() {
    const { chat, sidebar } = this.children;
    return template.compile({ chat, sidebar });
  }
}
