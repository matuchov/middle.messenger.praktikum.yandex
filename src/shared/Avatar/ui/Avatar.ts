import './Avatar.css';
import AvatarTmpl from '../template/Avatar.mtmp';

const avatarSizes = {
  small: 'avatar--small',
  large: 'avatar--large',
};

type avatarProps = {
  avatarSrc?: string;
  size?: keyof typeof avatarSizes;
};

export const Avatar = ({
  avatarSrc = '/assets/pictureIcon.png',
  size = 'small',
}: avatarProps): string => {
  return AvatarTmpl({ src: avatarSrc, class: avatarSizes[size] });
};
