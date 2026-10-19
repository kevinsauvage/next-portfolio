import type { ElementType, ReactNode } from 'react';

import MeshGradient from '@/components/shared/MeshGradient';

import clsx from 'clsx';

const HOVER_TRANSFORM_SM = 'translateY(-4px) scale(1.01)';

const PADDING_CLASSES = {
  sm: 'p-4 sm:p-5',
  md: 'p-6 sm:p-7 md:p-8',
  lg: 'p-8 sm:p-10 md:p-12',
} as const;

const HOVER_CLASSES = {
  none: '',
  subtle: 'hover:shadow-glow-sm focus-within:shadow-glow-sm',
  standard: 'hover:shadow-glow-md focus-within:shadow-glow-md',
  pronounced: 'hover:shadow-glow-lg focus-within:shadow-glow-lg',
} as const;

const HOVER_TRANSFORMS = {
  none: '',
  subtle: HOVER_TRANSFORM_SM,
  standard: HOVER_TRANSFORM_SM,
  pronounced: 'translateY(-8px) scale(1.02)',
} as const;

const HOVER_TRANSFORMS_MD = {
  ...HOVER_TRANSFORMS,
  standard: 'translateY(-8px) scale(1.01)',
  pronounced: 'translateY(-12px) scale(1.02)',
} as const;

type CardSize = keyof typeof PADDING_CLASSES;
type HoverEffect = keyof typeof HOVER_CLASSES;
type GlowVariant =
  'none' | 'primary-secondary' | 'secondary-accent' | 'primary-only' | 'secondary-only';

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
  /* eslint-disable security/detect-object-injection -- all keyed by typed unions */
  const animationDelay = animationIndex !== undefined ? Math.min(animationIndex * 100, 800) : 0;
  const baseClasses = clsx(
    'relative overflow-hidden',
    hover !== 'none' && 'transition-[transform,box-shadow,border-color] duration-200 ease-out',
    HOVER_CLASSES[hover]
  );
  // `anywhere` (not `break-word`) also shrinks min-content, so a long heading wraps
  // inside its flex/grid cell at 200% text size instead of being clipped by the
  // card's `overflow-hidden` (WCAG 1.4.4 / RGAA 10.4).
  const contentClasses = clsx(
    'h-full w-full relative z-10 [overflow-wrap:anywhere]',
    PADDING_CLASSES[size]
  );
  const hoverTransform = HOVER_TRANSFORMS[hover];
  const hoverTransformMd = HOVER_TRANSFORMS_MD[hover];
  /* eslint-enable security/detect-object-injection */

  return (
    <Component
      className={clsx(
        baseClasses,
        'group border border-zinc-800/80 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 rounded-xl ring-1 ring-inset ring-white/[0.04] hover:border-primary-700/40 hover:ring-primary-500/10 focus-within:border-primary-700/40 focus-within:ring-primary-500/10',
        animationIndex !== undefined && 'card-enter',
        className
      )}
      style={{
        ...(animationDelay > 0 && { animationDelay: `${animationDelay}ms` }),
        ...(hover !== 'none' &&
          ({
            '--hover-transform': hoverTransform,
            '--hover-transform-md': hoverTransformMd,
          } as React.CSSProperties)),
      }}
      {...props}
    >
      {glow !== 'none' && (
        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 ease-out z-0'>
          <MeshGradient overlayOpacity={85} lightweight />
        </div>
      )}
      <div className={contentClasses}>{children}</div>
    </Component>
  );
};
