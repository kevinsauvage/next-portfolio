import type { ElementType, ReactNode } from 'react';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const H4 = ({
  children,
  className,
  as: Component = 'h4',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = 'text-xl md:text-2xl leading-normal font-semibold font-heading';
  const textColor = gradient
    ? 'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'
    : 'text-zinc-50';

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export default H4;
