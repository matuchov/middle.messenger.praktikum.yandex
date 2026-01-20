import type { defaultProps } from '@/app/utils/Block/Block';
import { AvatarUploadClass } from '@/pages/AvatarUpload';
import { AvatarUploadController } from '../model/controller';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';

const controller = new AvatarUploadController();
class ChatAvatarUpload extends AvatarUploadClass {
  constructor(props: defaultProps) {
    const events = {
      submit: {
        listener: (e: SubmitEvent) => {
          controller.onSubmit(e);
        },
      },
    };
    super({ ...props, events });
  }
}

function mapAvatarError(state: IStore) {
  return {
    error: state.forms?.chatAvatar?.error,
  };
}

export default connect(ChatAvatarUpload, mapAvatarError);
