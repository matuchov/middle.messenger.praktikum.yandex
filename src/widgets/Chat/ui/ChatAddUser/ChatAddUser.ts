import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import './ChatAddUser.css';
import { MyButtonBlock } from '@/shared/MyButtonBlock';
import ChatController from '../../model/ChatController';
import { ChatAddUserTemplate } from './template/ChatAddUserTemplate';
import { Form } from '@/entities/Form';
import { MyInput } from '@/shared/MyInput';
import { connect } from '@/shared/utils/connect/model/connect';
import type { IStore } from '@/app/store/storeType';

interface ChatAddUserProps extends defaultProps {
  error?: string;
  addUserForm?: Form;
}

const template = new Templator(ChatAddUserTemplate);

class ChatAddUser extends Block<ChatAddUserProps> {
  constructor(props: ChatAddUserProps) {
    console.log('init');

    const addBtn = new MyButtonBlock({
      btnText: 'Добавить',
      btnType: 'submit',
      theme: 'default',
      btnClass: 'chat__header--add_user_btn',
    });
    const input = new MyInput({
      name: 'addUser',
      placeholder: 'id пользователя',
      inputType: 'text',
      isClean: true,
      inputClassname: 'chat__header--user_id_input',
    });

    const addUserForm = new Form({
      formContent: [input],
      subminBtn: addBtn,
      formClass: 'chat__header--form',
      events: {
        submit: {
          listener: (e) => {
            ChatController.addUser(e);
          },
        },
      },
    });

    super({ ...props, addUserForm });
  }

  protected componentDidUpdate(_: ChatAddUserProps, newProps: ChatAddUserProps): void {
    const errorText = newProps.error;

    this.children.addUserForm?.setProps({ errorText });
  }

  render() {
    const { addUserForm } = this.children;

    return template.compile({ addUserForm: addUserForm });
  }
}

function mapAddUser(state: IStore) {
  return {
    error: state.forms?.addUser?.error,
  };
}

export default connect(ChatAddUser, mapAddUser);
