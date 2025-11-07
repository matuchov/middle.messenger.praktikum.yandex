import SearchTemplate from '../template/Search.mtmp';
import './Search.css';

export const Search = ({ value }: { value: string }) => {
  return SearchTemplate({ value });
};
