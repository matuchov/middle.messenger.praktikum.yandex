export const dropdownTemplate = `<div class="dropdown">
  <button
    onclick="{{ onclick }}"
    title="dropdown"
    type="button"
    class="dropdown__action"
  >
    <img src="{{ btnIconSrc }}" alt="dropdown" class="dropdown__icon" />
  </button>
  <div class="dropdown__container {{ directionClass }}">
    <div class="box">
      <div class="dropdown__content">
        <ul class="dropdown__list">
          {{
            items
          }}
        </ul>
      </div>
    </div>
  </div>
</div>
`;

export const dropdownItemTemplate = `<li class="dropdown__item">
  <button  type="button" class="dropdown__action">
    <img src="{{ iconSrc }}" alt="" class="dropdown__icon" />
    <span class="dropdown__text">{{ itemText }}</span>
  </button>
  </li>`;
