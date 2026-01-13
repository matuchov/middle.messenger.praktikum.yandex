export const formTemlpate = `<form
  class="Form {{ formClass }}"
  action="{{ formAction }}"
  method="{{ formMetod }}"
>
  {{{ formContent }}}
  {{{ subminBtn }}}
   <div class="form__error">{{errorText}}</div>
</form>`;
