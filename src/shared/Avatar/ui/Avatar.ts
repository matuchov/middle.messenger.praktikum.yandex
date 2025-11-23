import './Avatar.css';
import { avatarTemplate } from '../template/Avatar';
import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';

const avatarSizes = {
  small: 'avatar--small',
  large: 'avatar--large',
} as const;

type avatarProps = {
  avatarSrc?: string;
  size?: keyof typeof avatarSizes;
};

const tepmlate = new Templator(avatarTemplate);

export class Avatar extends Block<avatarProps> {
  render() {
    const { avatarSrc = '/assets/pictureIcon.png', size = 'small' } = this.props;
    return tepmlate.compile({ src: avatarSrc, class: avatarSizes[size] });
  }
}
