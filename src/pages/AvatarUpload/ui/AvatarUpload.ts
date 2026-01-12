import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import type { AvatarUploadProps } from '../model/types.ts';
import { AvatarUploadTemplate } from '../template/AvatarUpload.ts';
import './AvatarUpload.css';
import { AvatarUploadController } from '../model/controller.ts';

const template = new Templator(AvatarUploadTemplate);
const controller = new AvatarUploadController();

export class AvatarUpload extends Block<AvatarUploadProps> {
  constructor(props: AvatarUploadProps) {
    const submitBtn = new MyButtonBlock({
      btnText: 'Поменять',
      btnType: 'submit',
      theme: 'default',
    });

    const events = {
      submit: {
        listener: (e: SubmitEvent) => {
          this.onSubmit(e);
        },
      },
    };

    super({
      ...props,
      submitBtn,
      events,
    });
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    console.log(e.target);
    const form = new FormData(e.target);
    controller.upload(form);
    const data = Object.fromEntries(form);
    console.log(data.avatar);
  }

  render() {
    const { submitBtn } = this.children;
    return template.compile({ submitBtn });
  }
}
