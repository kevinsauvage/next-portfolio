import type { ReactNode } from 'react';

import clsx from 'clsx';

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

export const CardHeader = ({ children, className, withBorder = false }: CardHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        withBorder && 'pb-4 border-b border-zinc-800',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardHeader;
