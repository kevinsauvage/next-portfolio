import { headingColor, type HeadingProps } from './typography';

import clsx from 'clsx';

type H3Props = HeadingProps & { size?: 'default' | 'sm' };

const SIZES = {
  default: 'text-2xl md:text-3xl',
  sm: 'text-xl md:text-2xl',
} as const;

export const H3 = ({
  children,
  className,
  as: Component = 'h3',
  gradient,
  size = 'default',
  ...props
}: H3Props) => (
  <Component
    className={clsx(
      // eslint-disable-next-line security/detect-object-injection -- keyed by the typed size union
      SIZES[size],
      'leading-snug font-semibold font-heading tracking-tight',
      headingColor(gradient),
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export default H3;
