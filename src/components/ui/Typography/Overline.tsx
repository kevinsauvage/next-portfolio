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
    'inline-flex items-center gap-2.5 font-mono text-xs leading-normal font-medium tracking-[0.22em] uppercase text-primary-400 before:h-3 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-primary-400 before:to-secondary-500 before:content-[""]';

  return (
    <Component className={clsx(classes, className)} {...props}>
      {children}
    </Component>
  );
};

export default Overline;
