import type { ElementType, ReactNode } from 'react';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Overline = ({
  children,
  className,
  as: Component = 'p',
  ...props
}: TypographyProps) => {
  const classes =
    'font-mono text-sm leading-normal font-medium tracking-[0.2em] uppercase text-primary-400 before:mr-2 before:text-primary-600 before:content-["_>_"]';

  return (
    <Component className={clsx(classes, className)} {...props}>
      {children}
    </Component>
  );
};

export default Overline;
