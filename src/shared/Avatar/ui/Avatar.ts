import './Avatar.css';
import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { avatarTemplate } from '../template/Avatar';

const avatarSizes = {
  small: 'avatar--small',
  large: 'avatar--large',
} as const;

interface avatarProps extends defaultProps {
  avatarSrc?: string;
  size?: keyof typeof avatarSizes;
}

const tepmlate = new Templator(avatarTemplate);

export class Avatar extends Block<avatarProps> {
  render() {
    const { avatarSrc = '/assets/pictureIcon.png', size = 'small' } = this.props;
    return tepmlate.compile({ src: avatarSrc, class: avatarSizes[size] });
  }
}
