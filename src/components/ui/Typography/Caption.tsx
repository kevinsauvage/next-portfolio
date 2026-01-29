import type { ElementType, ReactNode } from 'react';

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
  const classes = 'text-sm leading-normal font-medium text-zinc-300';

  return (
    <Component className={clsx(classes, className)} {...props}>
      {children}
    </Component>
  );
};

export default Caption;
