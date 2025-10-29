import type { ElementType, ReactNode } from 'react';

import { colors, getTypographyClasses } from '@/design-system/tokens';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const H5 = ({
  children,
  className,
  as: Component = 'h5',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h5');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export default H5;
