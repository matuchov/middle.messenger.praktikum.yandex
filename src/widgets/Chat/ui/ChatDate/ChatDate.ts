import './ChatDate.css';

import { Block, type defaultProps } from '@/app/utils/Block/Block';
import { Templator } from '@/app/utils/Templator/TemplatorClass';
import { ChatDateTemplate } from './template/ChatDate';

interface ChatDateProps extends defaultProps {
  date?: string;
}

const template = new Templator(ChatDateTemplate);

export class ChatDate extends Block<ChatDateProps> {
  render() {
    const { date } = this.props;
    return template.compile({ date });
  }
}
