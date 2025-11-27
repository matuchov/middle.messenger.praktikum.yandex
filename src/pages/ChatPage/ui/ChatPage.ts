import { Chat } from '@/widgets/Chat/ui/Chat';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import { ChatPageTemlpate } from '../template/ChatPage';
import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';

const template = new Templator(ChatPageTemlpate);

export class ChatPage extends Block<defaultProps> {
  protected init(): void {
    this.children = {
      chat: new Chat({}),
      sidebar: new Sidebar({}),
    };
  }

  render() {
    const { chat, sidebar } = this.children;
    return template.compile({ chat: this.getDom(chat), sidebar: this.getDom(sidebar) });
  }
}
