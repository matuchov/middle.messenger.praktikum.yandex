export const MyButtonIconTemlpate = `<img src="{{ iconSrc }}" alt="" class="mybutton__icon {{ iconClass }}" />`;

export const MyButtonTemplate = `<button

  type="{{ btnType }}"
  class="{{ templateBtnClass }}"
>
  {{{ icon }}}
  <span class="{{ templateTextClass }}">{{ btnText }}</span>
</button>
`;
