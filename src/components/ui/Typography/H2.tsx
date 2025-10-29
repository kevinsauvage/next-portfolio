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

export const H2 = ({
  children,
  className,
  as: Component = 'h2',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h2');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(className, classes, textColor)} {...props}>
      {children}
    </Component>
  );
};

export default H2;
