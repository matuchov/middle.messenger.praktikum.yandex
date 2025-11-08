import type { BoxProps } from '../model/types';
import BoxTemlpate from '../template/Box.mtmp';
import './Box.css';

export const Box = ({ boxClass = '', children = '' }: BoxProps) => {
  return BoxTemlpate({ boxClass, children });
};
