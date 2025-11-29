import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import type { AvatarUploadProps } from '../model/types.ts';
import { AvatarUploadTemplate } from '../template/AvatarUpload.ts';
import './AvatarUpload.css';

const template = new Templator(AvatarUploadTemplate);

export class AvatarUpload extends Block<AvatarUploadProps> {
  constructor(props: AvatarUploadProps) {
    const submitBtn = new MyButtonBlock({
      btnText: 'Поменять',
      btnType: 'submit',
      theme: 'default',
    });

    super({ ...props, submitBtn });
  }

  render() {
    const { submitBtn } = this.children;
    return template.compile({ submitBtn });
  }
}
