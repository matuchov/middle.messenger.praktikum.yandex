import './ChatDate.css';

import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
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
