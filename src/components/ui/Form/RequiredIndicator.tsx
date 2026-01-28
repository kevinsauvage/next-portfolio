import { colors } from '@/design-system/tokens';

import clsx from 'clsx';

type RequiredIndicatorProps = {
  className?: string;
};

const RequiredIndicator = ({ className }: RequiredIndicatorProps) => {
  return (
    <span className={clsx('absolute -right-3 -top-1 text-2xl', colors.status.error, className)}>
      *
    </span>
  );
};

export default RequiredIndicator;
