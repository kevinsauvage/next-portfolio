import type { ElementType, ReactNode } from 'react';

import { colors, typography } from '@/design-system/tokens';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
  size?: 'default' | 'sm';
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const H3 = ({
  children,
  className,
  as: Component = 'h3',
  gradient,
  size = 'default',
  ...props
}: TypographyProps) => {
  const { fontSize: defaultFontSize, ...otherStyles } = typography.h3;
  const fontSize = size === 'sm' ? 'text-xl md:text-2xl' : defaultFontSize;
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component
      className={clsx(fontSize, Object.values(otherStyles), textColor, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default H3;
