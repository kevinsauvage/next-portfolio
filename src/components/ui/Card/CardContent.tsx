import type { ReactNode } from 'react';

import clsx from 'clsx';

type CardContentProps = {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
};

export const CardContent = ({ children, className, spacing = 'md' }: CardContentProps) => {
  const spacingClasses = {
    sm: 'space-y-3',
    md: 'space-y-4',
    lg: 'space-y-6',
  } as const;

  return <div className={clsx(spacingClasses[spacing], className)}>{children}</div>;
};

export default CardContent;
