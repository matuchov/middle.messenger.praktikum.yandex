import type { MyButtonProps } from '../model/types';
import MyButtonTemlpate from '../template/MyButton.mtmp';
import MyButtonIconTemlpate from '../template/MyButtonIcon.mtmp';

import './MyButton.css';

export const MyButton = ({
  theme = 'default',
  onclick = '',
  btnClass = '',
  iconSrc = '',
  iconClass = '',
  textClass = '',
  btnText = 'sdadsd',
  btnType = 'button',
}: MyButtonProps) => {
  const icon = iconSrc ? MyButtonIconTemlpate({ iconSrc, iconClass }) : '';

  const templateTextClass = textClass;
  const templateBtnClass = theme === 'default' ? `mybutton ${btnClass}` : btnClass;

  return MyButtonTemlpate({
    icon,
    btnText,
    onclick,
    templateBtnClass,
    templateTextClass,
    btnType,
  });
};
