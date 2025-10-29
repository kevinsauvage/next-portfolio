import type { ElementType, ReactNode } from 'react';

import { getTypographyClasses } from '@/design-system/tokens';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Overline = ({
  children,
  className,
  as: Component = 'p',
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('overline');

  return (
    <Component className={clsx(classes, 'text-primary-400 uppercase', className)} {...props}>
      {children}
    </Component>
  );
};

export default Overline;
