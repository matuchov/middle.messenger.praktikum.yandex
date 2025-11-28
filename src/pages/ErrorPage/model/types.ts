import type { defaultProps } from '@/app/utils/Block';
import type { MyLink } from '@/shared/MyLink';
export interface ErrorPageProps extends defaultProps {
  error: string;
  link: MyLink;
}
