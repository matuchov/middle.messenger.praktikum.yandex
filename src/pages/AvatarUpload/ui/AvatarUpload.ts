import { Box } from '@/shared/Box/ui/Box';
import { MyButton } from '@/shared/MyButton';
import AvatarUploadTemlpate from '../template/AvatarUpload.mtmp';
import './AvatarUpload.css';

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
