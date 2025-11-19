import { templator } from '@/app/utils/Templator';
import type { MyButtonProps } from '../model/types';

import './MyButton.css';
import { Block } from '@/app/utils/Block';

const MyButtonIconTemlpate = templator(
  `<img src="{{ iconSrc }}" alt="" class="mybutton__icon {{ iconClass }}" />`
);

const MyButtonTemplate = templator(`<button
  
  type="{{ btnType }}"
  class="{{ templateBtnClass }}"
>
  {{{ icon }}}
  <span class="{{ templateTextClass }}">{{ btnText }}</span>
</button>
`);

export class MyButtonBlock extends Block<MyButtonProps> {
  render() {
    const { theme, btnClass, iconSrc, iconClass, textClass, btnText, btnType } = this.props;
    return MyButtonTemplate({
      setChildrens: {
        icon: iconSrc
          ? MyButtonIconTemlpate({
              setProps: { iconSrc, iconClass: iconClass || '' },
              setChildrens: {},
            })
          : document.createElement('div'),
      },
      setProps: {
        templateTextClass: textClass || '',
        theme: theme || '',
        templateBtnClass: theme === 'default' ? `mybutton ${btnClass || ''}` : btnClass || '',

        btnText: btnText || '',
        btnType: btnType || '',
      },
    });
  }
}
