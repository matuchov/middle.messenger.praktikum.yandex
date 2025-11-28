import { Box } from '@/shared/Box/ui/Box';
import { AvatarUploadTemplate, Container } from '../template/AvatarUpload.ts';
import './AvatarUpload.css';
import { Block, type defaultProps } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';

const tepmlate = new Templator(AvatarUploadTemplate);
const tepmlateContainer = new Templator(Container);

interface AvatarUploadT extends defaultProps {
  submitBtn?: MyButtonBlock;
  box?: Box;
}

export class AvatarUpload extends Block<AvatarUploadT> {
  constructor(props: AvatarUploadT) {
    const submitBtn = new MyButtonBlock({
      btnText: 'Поменять',
      btnType: 'submit',
    });
    const box = new Box({
      boxClass: 'avatar-upload',
      children: tepmlate.compile({ submitBtn }),
    });
    super({ ...props, box });
  }

  render() {
    const { box } = this.children;
    return tepmlateContainer.compile({ box });
  }
}
