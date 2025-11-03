import type { ElementType, ReactNode } from 'react';

import MeshGradient from '@/components/shared/MeshGradient';
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
  const HOVER_TRANSFORM_SM = 'translateY(-4px) scale(1.01)';
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
    subtle: HOVER_TRANSFORM_SM,
    standard: HOVER_TRANSFORM_SM,
    pronounced: 'translateY(-8px) scale(1.02)',
  };

  const hoverTransformsMd = {
    none: '',
    subtle: HOVER_TRANSFORM_SM,
    standard: 'translateY(-8px) scale(1.01)',
    pronounced: 'translateY(-12px) scale(1.02)',
  };

  const baseClasses = clsx(
    'relative overflow-hidden',
    hover !== 'none' && 'transition-all duration-300 ease-out',
    (() => {
      switch (hover) {
        case 'none':
          return hoverClasses.none;
        case 'subtle':
          return hoverClasses.subtle;
        case 'standard':
          return hoverClasses.standard;
        case 'pronounced':
          return hoverClasses.pronounced;
        default:
          return hoverClasses.standard;
      }
    })()
  );

  const animationStyle =
    animationIndex !== undefined
      ? {
          animationDelay: getStaggerDelay(animationIndex, animations.stagger.base),
        }
      : undefined;

  const paddingClass = (() => {
    switch (size) {
      case 'sm':
        return paddingClasses.sm;
      case 'md':
        return paddingClasses.md;
      case 'lg':
        return paddingClasses.lg;
      default:
        return paddingClasses.md;
    }
  })();

  const hoverTransform = (() => {
    switch (hover) {
      case 'none':
        return '';
      case 'subtle':
        return hoverTransforms.subtle;
      case 'standard':
        return hoverTransforms.standard;
      case 'pronounced':
        return hoverTransforms.pronounced;
      default:
        return hoverTransforms.standard;
    }
  })();
  const hoverTransformMd = (() => {
    switch (hover) {
      case 'none':
        return '';
      case 'subtle':
        return hoverTransformsMd.subtle;
      case 'standard':
        return hoverTransformsMd.standard;
      case 'pronounced':
        return hoverTransformsMd.pronounced;
      default:
        return hoverTransformsMd.standard;
    }
  })();

  const contentClasses = clsx('h-full w-full relative z-10', paddingClass);

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
            '--hover-transform': hoverTransform,
            '--hover-transform-md': hoverTransformMd,
          } as React.CSSProperties)),
      }}
      {...props}
    >
      {glow !== 'none' && (
        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-0'>
          <MeshGradient overlayOpacity={85} />
        </div>
      )}
      <div className={contentClasses}>
        <div className='relative z-10 h-full w-full'>{children}</div>
      </div>
    </Component>
  );
};
