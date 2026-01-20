import { Auth } from '@/widgets/Auth';
import { SingUpPattern } from '../model/pattern';
import type { IStore } from '@/app/store/storeType';
import type { AuthProps } from '@/widgets/Auth/model/types';
import { connect } from '@/shared/utils/connect/model/connect';
import type { defaultProps } from '@/app/utils/Block/Block';
import { RegistrationController } from '../model/controller';

const controller = new RegistrationController();

class Login extends Auth {
  constructor(props: defaultProps) {
    super({ ...props, onSubmit: controller.signup, pattern: SingUpPattern });
  }
}

function mapLoginError(state: IStore) {
  return {
    errorText: state.forms?.signup?.error,
  };
}

export default connect<AuthProps>(Login, mapLoginError);
