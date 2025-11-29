export const myInputTemplate = `<div >
<div class=" myInput {{ inputClass }}">
<label for="{{ name }}">{{ label }}</label>
  <input
    placeholder="{{ placeholder }}"
    name="{{ name }}"
    id="{{ name }}"
    type="{{ inputType }}"
    value="{{ value }}"
    {{isDisabled}}
  /></div>
  <div class="myInput__error">{{ errorText }}</div>
</div>`;

export const clearInputTemplate = `<input
    class="{{inputClassname}}"
      placeholder="{{ placeholder }}"
      name="{{ name }}"
      id="{{ name }}"
      type="{{ inputType }}"
      value="{{ value }}"
      {{isDisabled}}
    />`;
