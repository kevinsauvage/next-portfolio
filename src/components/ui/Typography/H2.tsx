import type { ElementType, ReactNode } from 'react';

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
  const classes = 'text-3xl md:text-5xl leading-snug font-bold font-heading';
  const textColor = gradient
    ? 'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'
    : 'text-zinc-50';

  return (
    <Component className={clsx(className, classes, textColor)} {...props}>
      {children}
    </Component>
  );
};

export default H2;
