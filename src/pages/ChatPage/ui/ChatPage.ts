import { Chat } from '@/widgets/Chat/ui/Chat';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import ChatPageTemlpate from '../template/ChatPage.mtmp';

export const ChatPage = () => {
  const chat = Chat();

  const sidebar = Sidebar();

  return ChatPageTemlpate({ chat, sidebar });
};
