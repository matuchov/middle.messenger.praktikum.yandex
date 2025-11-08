import { MyButton } from '@/shared/MyButton/ui/MyButton';
import { MyLink } from '@/shared/MyLink';
import { Form } from '@/entities/Form';
import { Box } from '@/shared/Box';
import AuthTemplate from '../template/Auth.mtmp';
import type { AuthProps } from '../model/types';
import './Auth.css';
import { AuthPatterns } from '../model/pattern';

export const Auth = ({ page }: AuthProps) => {
  const inputs = AuthPatterns[page].inputs;
  const subminBtn = MyButton(AuthPatterns[page].button);
  const link = MyLink(AuthPatterns[page].link);

  const form = Form({
    inputs,
    formClass: 'auth__form',
    subminBtn: subminBtn,
  });

  return AuthTemplate({ children: Box({ children: form + link, boxClass: 'auth__box' }) });
};
