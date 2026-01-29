import type { ElementType, ReactNode } from 'react';

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
  const fontSize = size === 'sm' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl';
  const otherStyles = 'leading-snug font-semibold font-heading';
  const textColor = gradient
    ? 'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text'
    : 'text-zinc-50';

  return (
    <Component className={clsx(fontSize, otherStyles, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export default H3;
