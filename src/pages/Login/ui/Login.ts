import { Auth } from '@/widgets/Auth';
import { SingInController } from '../model/controller';
import { SingInPattern } from '../model/pattern';
import type { IStore } from '@/app/store/storeType';
import { connect } from '@/shared/utils/connect/model/connect';
import type { defaultProps } from '@/app/utils/Block/Block';

const controller = new SingInController();

class Login extends Auth {
  constructor(props: defaultProps) {
    super({ ...props, onSubmit: controller.singin, pattern: SingInPattern });
  }
}

function mapLoginError(state: IStore) {
  return {
    errorText: state.forms?.singin?.error,
  };
}

export default connect(Login, mapLoginError);
