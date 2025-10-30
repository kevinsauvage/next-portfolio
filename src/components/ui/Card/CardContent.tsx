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

  const spacingClass = (() => {
    switch (spacing) {
      case 'sm':
        return spacingClasses.sm;
      case 'md':
        return spacingClasses.md;
      case 'lg':
        return spacingClasses.lg;
    }
  })();

  return <div className={clsx(spacingClass, className)}>{children}</div>;
};

export default CardContent;
