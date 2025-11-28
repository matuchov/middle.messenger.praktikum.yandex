export const myInputTemplate = `<div >
<div class=" myInput {{ inputClass }}">  
<label for="{{ name }}">{{ label }}</label>
  <input
    name="{{ name }}"
    id="{{ name }}"
    type="{{ inputType }}"
    value="{{ value }}"
    {{isDisabled}}
  /></div>
  <div class="myInput__error">{{ errorText }}</div>
</div>`;
