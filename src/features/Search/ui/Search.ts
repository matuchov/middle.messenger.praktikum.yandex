import { searchTemplate } from '../template/Search';
import './Search.css';

import { Block } from '@/app/utils/Block';

import { Templator } from '@/app/utils/TemplatorClass';

const tepmlate = new Templator(searchTemplate);

type searchT = {
  value: string;
};

export class Search extends Block<searchT> {
  render() {
    const { value } = this.props;
    return tepmlate.compile({ value });
  }
}
