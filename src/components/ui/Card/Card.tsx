import type { ElementType, ReactNode } from 'react';
import Image from 'next/image';

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

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

export const CardHeader = ({ children, className, withBorder = false }: CardHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        withBorder && 'pb-4 border-b border-zinc-800',
        className
      )}
    >
      {children}
    </div>
  );
};

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
  };

  return (
    <div
      className={clsx(
        'inline-flex p-3 rounded-xl transition-all duration-300 shadow-glow-sm group-hover:shadow-glow-md',
        variantClasses[variant],
        className
      )}
      aria-hidden='true'
    >
      {children}
    </div>
  );
};

type CardFooterProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

export const CardFooter = ({ children, className, withBorder = true }: CardFooterProps) => {
  return (
    <footer className={clsx(withBorder && 'border-t border-zinc-800 pt-4', className)}>
      {children}
    </footer>
  );
};

type CardContentProps = {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
};

export const CardContent = ({ children, className, spacing = 'md' }: CardContentProps) => {
  const spacingClasses = {
    sm: 'space-y-3',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  return <div className={clsx(spacingClasses[spacing], className)}>{children}</div>;
};

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  priority?: boolean;
  quality?: number;
  sizes?: string;
  width?: number;
  height?: number;
};

export const CardImage = ({
  src,
  alt,
  className,
  aspectRatio = 'video',
  objectFit = 'cover',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, 40vw',
  width = 800,
  height = 600,
}: CardImageProps) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/10]',
    auto: '',
  };

  return (
    <div
      className={clsx(
        'relative w-full rounded-lg overflow-hidden border border-zinc-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg group-hover:shadow-glow-md',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={clsx(
          'w-full h-full transition-transform duration-500 group-hover:scale-110',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill'
        )}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
      />
      {/* Overlay gradient on hover */}
      <div className='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
    </div>
  );
};
