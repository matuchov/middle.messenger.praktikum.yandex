import { Avatar } from '@/shared/Avatar';
import { MyLink } from '@/shared/MyLink';
import { Form } from '@/entities/Form';
import { Block } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton.ts';
import { MyInput } from '@/shared/MyInput/index.ts';
import { ProfilePatterns } from '../model/pattern';
import { ProfileTemlpate } from '../template/Profile.ts';
import type { ProfileProps } from '../model/types';
import './Profile.css';
import { connect } from '@/shared/utils/connect/model/connect.ts';
import type { IStore } from '@/app/store/storeType.ts';
import { ProfileController } from '../model/controller.ts';

const template = new Templator(ProfileTemlpate);
const profileController = new ProfileController();

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    const { page } = props;
    const { disabled, isValidate } = ProfilePatterns[page];
    const avatar = new Avatar({ size: 'large' });
    const inputsPattern = ProfilePatterns[page].inputs;
    const inputs = inputsPattern.map((el) => new MyInput({ ...el, disabled, isValidate }));
    const sumbitBtn = ProfilePatterns[page].submitBtn
      ? new MyButtonBlock(ProfilePatterns[page].submitBtn)
      : undefined;

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

    const links = ProfilePatterns[page].links
      ? ProfilePatterns[page].links.map((el) => new MyLink(el))
      : undefined;

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

    if (isValid && e.target instanceof HTMLFormElement) {
      profileController.changeUser(e.target);
    }
  }

  render() {
    const { formContent, avatarComponent, links, inputs } = this.children;
    inputs?.forEach((el) => {
      el.setProps({ value: this.props.user[el.props.name] });
    });
    return template.compile({ formContent, avatarComponent, links });
  }
}

function mapUserToProps(state: IStore) {
  return {
    user: state.user,
  };
}

export default connect(Profile, mapUserToProps);
