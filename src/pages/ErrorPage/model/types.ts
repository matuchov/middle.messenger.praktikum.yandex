import type { MyLink } from '@/shared/MyLink';
import type { defaultProps } from '@/app/utils/Block';

export interface ErrorPageProps extends defaultProps {
  error: string;
  link?: MyLink;
}
