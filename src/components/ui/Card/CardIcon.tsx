import type { ReactNode } from 'react';

import clsx from 'clsx';

type CardIconProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'purple' | 'blue';
};

export const CardIcon = ({ children, className, variant = 'primary' }: CardIconProps) => {
  const variantClasses = {
    primary:
      'bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:from-primary-500 group-hover:to-secondary-500',
    secondary: 'bg-purple-500/10 border border-purple-500/20',
    accent: 'bg-blue-500/10 border border-blue-500/20',
    purple: 'bg-purple-500/10 border border-purple-500/20',
    blue: 'bg-blue-500/10 border border-blue-500/20',
  } as const;

  const variantClass = (() => {
    switch (variant) {
      case 'primary':
        return variantClasses.primary;
      case 'secondary':
        return variantClasses.secondary;
      case 'accent':
        return variantClasses.accent;
      case 'purple':
        return variantClasses.purple;
      case 'blue':
        return variantClasses.blue;
      default:
        return variantClasses.primary;
    }
  })();

  return (
    <div
      className={clsx(
        'inline-flex p-3 rounded-xl transition-all duration-300 shadow-glow-sm group-hover:shadow-glow-md',
        variantClass,
        className
      )}
      aria-hidden='true'
    >
      {children}
    </div>
  );
};

export default CardIcon;
