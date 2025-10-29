import type { ElementType, ReactNode } from 'react';

import GlowEffect from '@/components/shared/GlowEffect';
import { animations, getStaggerDelay } from '@/design-system/tokens';

import clsx from 'clsx';

type CardSize = 'sm' | 'md' | 'lg';
type HoverEffect = 'none' | 'subtle' | 'standard' | 'pronounced';
type GlowVariant =
  | 'none'
  | 'primary-secondary'
  | 'secondary-accent'
  | 'primary-only'
  | 'secondary-only';

type CardProps = {
  children: ReactNode;
  className?: string;
  size?: CardSize;
  hover?: HoverEffect;
  glow?: GlowVariant;
  animationIndex?: number;
  as?: ElementType;
} & React.HTMLAttributes<HTMLElement>;

export const Card = ({
  children,
  className,
  size = 'md',
  hover = 'standard',
  glow = 'none',
  animationIndex,
  as: Component = 'article',
  ...props
}: CardProps) => {
  const paddingClasses = {
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7 md:p-8',
    lg: 'p-8 sm:p-10 md:p-12',
  };

  const hoverClasses = {
    none: '',
    subtle: 'hover:shadow-glow-sm',
    standard: 'hover:shadow-glow-md ',
    pronounced: 'hover:shadow-glow-lg',
  };

  const hoverTransforms = {
    none: '',
    subtle: 'translateY(-4px) scale(1.01)',
    standard: 'translateY(-4px) scale(1.01)',
    pronounced: 'translateY(-8px) scale(1.02)',
  };

  const hoverTransformsMd = {
    none: '',
    subtle: 'translateY(-4px) scale(1.01)',
    standard: 'translateY(-8px) scale(1.01)',
    pronounced: 'translateY(-12px) scale(1.02)',
  };

  const baseClasses = clsx(
    'relative overflow-hidden',
    hover !== 'none' && 'transition-all duration-300 ease-out',
    hoverClasses[hover]
  );

  const animationStyle =
    animationIndex !== undefined
      ? {
          animationDelay: getStaggerDelay(animationIndex, animations.stagger.base),
        }
      : undefined;

  const contentClasses = clsx('h-full w-full relative z-10', paddingClasses[size]);

  return (
    <Component
      className={clsx(
        baseClasses,
        'group border border-zinc-700 bg-zinc-900/50 rounded-lg',
        animationIndex !== undefined && 'card-fade-in',
        className
      )}
      style={{
        ...animationStyle,
        ...(animationIndex !== undefined && { opacity: 0 }),
        ...(hover !== 'none' &&
          ({
            '--hover-transform': hoverTransforms[hover],
            '--hover-transform-md': hoverTransformsMd[hover],
          } as React.CSSProperties)),
      }}
      {...props}
    >
      <div className={contentClasses}>
        {glow !== 'none' && <GlowEffect variant={glow} intensity='low' />}
        <div className='relative z-10 h-full w-full'>{children}</div>
      </div>
    </Component>
  );
};
