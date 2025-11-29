import type { DropdownProps } from '@/shared/Dropdown';

export const footerDropdown: DropdownProps = {
  direction: 'topLeft',
  items: [
    { itemSrc: '/assets/fileIcon.svg', itemText: 'Файл' },
    {
      itemSrc: '/assets/mediaIcon.svg',
      itemText: 'Фото или Видео',
    },
    {
      itemSrc: '/assets/locationIcon.svg',
      itemText: 'Локация',
    },
  ],
  btnIconSrc: '/assets/clipIcon.svg',
};
