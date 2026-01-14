import { Avatar } from '@/shared/Avatar';
import { MyLink } from '@/shared/MyLink';
import { Form } from '@/entities/Form';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { ProfileTemlpate } from '../template/Profile.ts';
import type { Iuser, ProfileProps } from '../model/types.ts';
import { connect } from '@/shared/utils/connect/model/connect.ts';
import type { IStore } from '@/app/store/storeType.ts';
import './Profile.css';
import { RESOURCES_URL } from '@/shared/Config/index.ts';
import { ProfileController } from '../model/controller.ts';

const template = new Templator(ProfileTemlpate);
const controller = new ProfileController();

const createLink = (url?: string) => {
  if (url) {
    return RESOURCES_URL + url;
  } else {
    return undefined;
  }
};

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    const { user, pattern } = props;
    const avatar = new Avatar({ size: 'large', avatarSrc: createLink(user?.avatar) });
    const inputs = pattern.inputs.map((el) => {
      let value;
      if (user && Object.hasOwn(user, el.name)) {
        value = user[el.name as keyof Iuser].toString();
      } else {
        value = '';
      }
      return new MyInput({ ...el, disabled: true, isValidate: false, value });
    });

    const avatarComponent = new MyLink({
      linkText: '',
      linkClassName: 'profile__avatar_change',
      linkHref: '/AvatarUpload',
      child: avatar,
    });

    const formContent = new Form({
      formClass: 'profile__form',
      formContent: inputs,
      events: {
        submit: {
          listener: (e) => {
            controller.onSubmit(e, this);
          },
        },
      },
    });

    const links = pattern.links ? pattern.links.map((el) => new MyLink(el)) : undefined;

    super({ ...props, avatarComponent, formContent, links, inputs });
  }

  protected componentDidUpdate(_: ProfileProps, newProps: ProfileProps): boolean {
    const { user, pattern, isProfileEdit = false } = newProps;
    const sumbitBtn = isProfileEdit ? new MyButtonBlock(pattern.submitBtn) : undefined;
    console.log(this.props);

    this.children.avatarComponent?.children?.child?.setProps({
      avatarSrc: RESOURCES_URL + user?.avatar,
    });
    this.children.formContent?.setProps({ subminBtn: sumbitBtn });
    this.children.formContent?.dispatchComponentRender();

    this.children.inputs?.forEach((el) => {
      el.setProps({
        value: user?.[el.props.name as keyof Iuser].toString(),
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
