import { Block, type defaultProps } from '@/app/utils/Block.ts';
import { Templator } from '@/app/utils/TemplatorClass';
import './ChatAddUser.css';
import { MyButtonBlock } from '@/shared/MyButtonBlock';
import ChatController from '../../model/ChatController';
import { ChatAddUserTemplate } from './template/ChatAddUserTemplate';
import { Form } from '@/entities/Form';
import { MyInput } from '@/shared/MyInput';

const template = new Templator(ChatAddUserTemplate);

export class ChatAddUser extends Block<defaultProps> {
  constructor(props: defaultProps) {
    super({ ...props });
  }

  createForm() {
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
    return new Form({
      formContent: [input],
      subminBtn: addBtn,
      formClass: 'chat__header--form',
      events: {
        submit: {
          listener: (e) => {
            e.preventDefault();
            console.log(e);
          },
        },
      },
    });
  }

  render() {
    return template.compile({ addUserForm: this.createForm() });
  }
}
