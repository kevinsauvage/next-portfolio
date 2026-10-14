import type { ReactNode } from 'react';

import clsx from 'clsx';

const PRIMARY =
  'bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:from-primary-500 group-hover:to-secondary-500 border border-transparent';
const SECONDARY = 'bg-secondary-500/10 border border-secondary-500/25';

const VARIANT_CLASSES = {
  primary: PRIMARY,
  secondary: SECONDARY,
  accent: 'bg-accent-500/10 border border-accent-500/25',
  purple: 'bg-primary-500/10 border border-primary-500/25',
  blue: SECONDARY,
} as const;

type CardIconProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof VARIANT_CLASSES;
};

export const CardIcon = ({ children, className, variant = 'primary' }: CardIconProps) => (
  <div
    className={clsx(
      'inline-flex p-3 rounded-xl transition-shadow duration-200 shadow-glow-sm group-hover:shadow-glow-md',
      // eslint-disable-next-line security/detect-object-injection -- keyed by a typed union
      VARIANT_CLASSES[variant],
      className
    )}
    aria-hidden='true'
  >
    {children}
  </div>
);

export default CardIcon;
