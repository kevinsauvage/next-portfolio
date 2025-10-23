import type { ElementType, ReactNode } from 'react';

import BoxWithBackground from '@/components/BoxWithBackground';
import GlowEffect from '@/components/GlowEffect';
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
  withBackground?: boolean;
  backgroundScale?: number;
  backgroundStrokeWidth?: number;
  animationIndex?: number;
  as?: ElementType;
} & React.HTMLAttributes<HTMLElement>;

export const Card = ({
  children,
  className,
  size = 'md',
  hover = 'standard',
  glow = 'none',
  withBackground = true,
  backgroundScale = 0.2,
  backgroundStrokeWidth = 1,
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
    subtle: 'hover:-translate-y-1 hover:scale-[1.01]',
    standard: 'hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.01]',
    pronounced: 'hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.02]',
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
          animationFillMode: 'both' as const,
        }
      : undefined;

  const contentClasses = clsx('h-full w-full relative z-10', paddingClasses[size]);

  const gradientClasses =
    'absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-900/90 z-0 group-hover:from-zinc-900 group-hover:via-zinc-900/90 transition-all duration-500';

  if (withBackground) {
    return (
      <BoxWithBackground
        className={clsx(
          baseClasses,
          'group',
          animationIndex !== undefined && 'animate-fade-in-up opacity-0',
          className
        )}
        backgroundConfig={{ scale: backgroundScale, strokeWidth: backgroundStrokeWidth }}
        style={animationStyle}
      >
        <Component className={contentClasses} {...props}>
          <div className={gradientClasses} />
          {glow !== 'none' && <GlowEffect variant={glow} intensity='low' />}
          <div className='relative z-10 h-full w-full'>{children}</div>
        </Component>
      </BoxWithBackground>
    );
  }

  return (
    <Component
      className={clsx(
        baseClasses,
        'group border border-zinc-700 bg-zinc-900/50 rounded-lg',
        animationIndex !== undefined && 'animate-fade-in-up opacity-0',
        className
      )}
      style={animationStyle}
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
