import type { ElementType, ReactNode } from 'react';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Body = ({ children, className, as: Component = 'p', ...props }: TypographyProps) => {
  const classes = 'text-base md:text-lg leading-relaxed font-light text-zinc-200';

  return (
    <Component className={clsx(classes, className)} {...props}>
      {children}
    </Component>
  );
};

export default Body;
