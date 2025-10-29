import type { ReactNode } from 'react';

import clsx from 'clsx';

type CardFooterProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

export const CardFooter = ({ children, className, withBorder = true }: CardFooterProps) => {
  return (
    <footer className={clsx(withBorder && 'border-t border-zinc-800 pt-4', className)}>
      {children}
    </footer>
  );
};

export default CardFooter;
