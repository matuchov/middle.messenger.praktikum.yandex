import type { defaultProps } from '@/app/utils/Block/Block';
import type { MyButtonBlock } from '@/shared/MyButtonBlock/ui/MyButton';

export interface AvatarUploadProps extends defaultProps {
  submitBtn?: MyButtonBlock;
  error?: string;
  fileName?: string;
}
