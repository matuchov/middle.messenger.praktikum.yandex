import { Box } from '@/shared/Box/ui/Box';
import AvatarloadTemlpate from '../template/Avatarload.mtmp';
import './Avatarload.css';
import { MyButton } from '@/shared/MyButton';

export const Avatarload = () => {
  const submitBtn = MyButton({
    btnText: 'Поменять',
    btnType: 'submit',
  });

  return Box({
    boxClass: 'avatarload',
    children: AvatarloadTemlpate({ submitBtn }),
  });
};
