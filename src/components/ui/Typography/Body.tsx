import type { ElementType, ReactNode } from 'react';

import { colors, getTypographyClasses } from '@/design-system/tokens';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Body = ({ children, className, as: Component = 'p', ...props }: TypographyProps) => {
  const classes = getTypographyClasses('body');

  return (
    <Component className={clsx(classes, colors.text.secondary, className)} {...props}>
      {children}
    </Component>
  );
};

export default Body;
