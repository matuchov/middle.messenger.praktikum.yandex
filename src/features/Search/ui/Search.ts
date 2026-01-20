import { Block, type defaultProps } from '@/app/utils/Block/Block';
import { Templator } from '@/app/utils/Templator/TemplatorClass';
import { searchTemplate } from '../template/Search';
import './Search.css';

const tepmlate = new Templator(searchTemplate);

interface searchT extends defaultProps {
  value: string;
}

export class Search extends Block<searchT> {
  render() {
    const { value } = this.props;
    return tepmlate.compile({ value });
  }
}
