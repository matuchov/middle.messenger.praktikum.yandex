import { Box } from '@/shared/Box/ui/Box';
import AvatarUploadTemlpate from '../template/AvatarUpload.mtmp';
import './AvatarUpload.css';
import { MyButton } from '@/shared/MyButton';

export const AvatarUpload = () => {
  const submitBtn = MyButton({
    btnText: 'Поменять',
    btnType: 'submit',
  });

  return Box({
    boxClass: 'avatar-upload',
    children: AvatarUploadTemlpate({ submitBtn }),
  });
};
