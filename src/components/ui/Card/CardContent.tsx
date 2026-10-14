import type { ReactNode } from 'react';

import clsx from 'clsx';

type CardContentProps = {
  children: ReactNode;
  className?: string;
  spacing?: keyof typeof SPACING_CLASSES;
};

const SPACING_CLASSES = {
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-6',
} as const;

export const CardContent = ({ children, className, spacing = 'md' }: CardContentProps) => (
  // eslint-disable-next-line security/detect-object-injection -- keyed by a typed union
  <div className={clsx(SPACING_CLASSES[spacing], className)}>{children}</div>
);

export default CardContent;
