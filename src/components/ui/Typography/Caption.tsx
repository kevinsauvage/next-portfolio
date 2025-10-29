import type { ElementType, ReactNode } from 'react';

import { colors, getTypographyClasses } from '@/design-system/tokens';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Caption = ({
  children,
  className,
  as: Component = 'span',
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('caption');

  return (
    <Component className={clsx(classes, colors.text.tertiary, className)} {...props}>
      {children}
    </Component>
  );
};

export default Caption;
