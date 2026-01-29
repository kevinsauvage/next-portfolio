import type { ElementType, ReactNode } from 'react';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Display = ({
  children,
  className,
  as: Component = 'h1',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = 'text-5xl md:text-6xl lg:text-7xl leading-tight font-bold font-heading';
  const textColor = gradient
    ? 'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'
    : 'text-zinc-50';

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export default Display;
