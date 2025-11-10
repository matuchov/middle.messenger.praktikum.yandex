import { Avatar } from '@/shared/Avatar';
import { MyButton } from '@/shared/MyButton';
import { MyLink } from '@/shared/MyLink';
import { Form } from '@/entities/Form';
import { ProfilePatterns } from '../model/pattern';
import ProfileTemlpate from '../template/Profile.mtmp';
import type { ProfileProps } from '../model/types';
import './Profile.css';

export const Profile = ({ page }: ProfileProps) => {
  const avatarComponent = MyLink({
    linkText: Avatar({ size: 'large' }),
    linkClassName: 'profile__avatar_change',
    linkHref: '/AvatarUpload',
  });

  const { inputs } = ProfilePatterns[page];

  const sumbitBtn = ProfilePatterns[page].submitBtn
    ? MyButton(ProfilePatterns[page].submitBtn)
    : '';

  const formContent = Form({
    disabled: ProfilePatterns[page].disabled,
    inputs,
    formClass: 'profile__form',
    subminBtn: sumbitBtn,
  });

  const links = ProfilePatterns[page].links ? ProfilePatterns[page].links.map(MyLink).join('') : '';

  return ProfileTemlpate({ formContent, avatarComponent, links });
};
