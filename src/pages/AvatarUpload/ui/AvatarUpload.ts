import { Block } from '@/app/utils/Block';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import type { AvatarUploadProps } from '../model/types.ts';
import { AvatarUploadTemplate } from '../template/AvatarUpload.ts';
import { AvatarUploadController } from '../model/controller.ts';
import type { IStore } from '@/app/store/storeType.ts';
import { connect } from '@/shared/utils/connect/model/connect.ts';
import './AvatarUpload.css';

const template = new Templator(AvatarUploadTemplate);
const controller = new AvatarUploadController();

export class AvatarUploadClass extends Block<AvatarUploadProps> {
  constructor(props: AvatarUploadProps) {
    const submitBtn = new MyButtonBlock({
      btnText: 'Поменять',
      btnType: 'submit',
      theme: 'default',
    });

    const events = {
      ...props.events,
      submit: props.events?.submit || {
        listener: (e: SubmitEvent) => {
          controller.onSubmit(e);
        },
      },
    };

    super({
      ...props,
      submitBtn,
      events,
    });
  }

  render() {
    const { error } = this.props;
    const { submitBtn } = this.children;
    return template.compile({ submitBtn, error });
  }
}

function mapAvatarError(state: IStore) {
  return {
    error: state.forms?.avatar?.error,
  };
}

export default connect(AvatarUploadClass, mapAvatarError);
