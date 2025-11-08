import { Chat } from '@/widgets/Chat/ui/Chat';
import ChatPageTemlpate from '../template/ChatPage.mtmp';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';

export const ChatPage = () => {
  const chat = Chat();

  const sidebar = Sidebar();

  return ChatPageTemlpate({ chat, sidebar });
};
