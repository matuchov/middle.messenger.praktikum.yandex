import { Avatar } from '@/shared/Avatar';
import { MyLink } from '@/shared/MyLink';
import { Form } from '@/entities/Form';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { ProfileTemlpate } from '../template/Profile.ts';
import type { ProfileProps } from '../model/types.ts';
import './Profile.css';
import { connect } from '@/shared/utils/connect/model/connect.ts';
import type { IStore } from '@/app/store/storeType.ts';

const template = new Templator(ProfileTemlpate);

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    const { user, pattern, isProfileEdit } = props;
    const avatar = new Avatar({ size: 'large', avatarSrc: user?.avatar });
    const inputs = pattern.inputs.map((el) => {
      let value;
      if (user && Object.hasOwn(user, el.name)) {
        value = user[el.name];
      } else {
        value = '';
      }
      return new MyInput({ ...el, disabled: !isProfileEdit, isValidate: isProfileEdit, value });
    });
    const sumbitBtn = pattern.submitBtn ? new MyButtonBlock(pattern.submitBtn) : undefined;

    const avatarComponent = new MyLink({
      linkText: '',
      linkClassName: 'profile__avatar_change',
      linkHref: '/AvatarUpload',
      child: avatar,
    });

    const formContent = new Form({
      formClass: 'profile__form',
      subminBtn: sumbitBtn,
      formContent: inputs,
      events: {
        submit: {
          listener: (e) => {
            this.onSubmit(e);
          },
        },
      },
    });

    const links = pattern.links ? pattern.links.map((el) => new MyLink(el)) : undefined;

    super({ ...props, avatarComponent, formContent, links, inputs });
  }

  protected onSubmit(e: SubmitEvent) {
    e.preventDefault();
    let isValid = true;
    this.children.inputs?.forEach((el) => {
      if (el instanceof MyInput) {
        if (el.validate() === false) {
          isValid = false;
        }
      }
    });

    if (isValid && e.target instanceof HTMLFormElement && this.props.onSubmit) {
      this.props.onSubmit(e.target);
    }
  }

  protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
    const { user, isProfileEdit = false } = newProps;
    this.children.inputs?.forEach((el) => {
      el.setProps({
        value: user[el.props.name],
        isValidate: isProfileEdit,
        disabled: !isProfileEdit,
      });
    });
    return true;
  }

  render() {
    const { formContent, avatarComponent, links } = this.children;
    return template.compile({ formContent, avatarComponent, links });
  }
}

function mapUserToProps(state: IStore) {
  const { isProfileEdit, user } = state;
  return {
    user,
    isProfileEdit,
  };
}

export default connect(Profile, mapUserToProps);
