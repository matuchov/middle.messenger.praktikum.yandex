import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import { MyButtonBlock } from '@/shared/MyButtonBlock';

import { Form } from '@/entities/Form';
import { MyInput } from '@/shared/MyInput';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';
import { SidebarController } from '../../model/SidebarCotroller';
import { CreateChatTemplate } from './template/CreateChat';
import './CreateChat.css';

interface CreateChatProps extends defaultProps {
  error?: string;
  CreateChatForm?: Form;
}

const controller = new SidebarController();
const template = new Templator(CreateChatTemplate);

class CreateChat extends Block<CreateChatProps> {
  constructor(props: CreateChatProps) {
    const addBtn = new MyButtonBlock({
      btnText: 'Создать',
      btnType: 'submit',
      theme: 'default',
      btnClass: 'sidebar--add_user_btn',
    });
    const input = new MyInput({
      name: 'createChat',
      placeholder: 'Имя чата',
      inputType: 'text',
      isClean: true,
      inputClassname: 'sidebar--user_id_input',
    });

    const CreateChatForm = new Form({
      formContent: [input],
      subminBtn: addBtn,
      formClass: 'sidebar--form',
      events: {
        submit: {
          listener: (e) => {
            controller.createChat(e);
          },
        },
      },
    });

    super({ ...props, CreateChatForm });
  }

  protected componentDidUpdate(_: CreateChatProps, newProps: CreateChatProps): void {
    const errorText = newProps.error;

    this.children.CreateChatForm?.setProps({ errorText });
  }

  render() {
    const { CreateChatForm } = this.children;

    return template.compile({ CreateChatForm });
  }
}

function mapAddUser(state: IStore) {
  return {
    error: state.forms?.createChat?.error,
  };
}

export default connect(CreateChat, mapAddUser);
