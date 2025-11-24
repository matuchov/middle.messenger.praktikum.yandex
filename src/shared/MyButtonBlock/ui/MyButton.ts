import type { MyButtonProps } from '../model/types';

import './MyButton.css';
import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonIconTemlpate, MyButtonTemplate } from '../template/MyButtonTemplate';

const iconTemlpate = new Templator(MyButtonIconTemlpate);
const buttonTemplate = new Templator(MyButtonTemplate);

export class MyButtonBlock extends Block<MyButtonProps> {
  render() {
    const { theme, btnClass = '', iconSrc, iconClass, textClass, btnText, btnType } = this.props;
    return buttonTemplate.compile({
      icon: iconSrc ? iconTemlpate.compile({ iconSrc, iconClass: iconClass || '' }) : '',

      templateTextClass: textClass,
      theme,
      templateBtnClass: theme === 'default' ? `mybutton ${btnClass}` : btnClass,
      btnText,
      btnType,
    });
  }
}
