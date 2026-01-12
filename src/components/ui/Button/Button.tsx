'use client';

import { cloneElement, isValidElement } from 'react';

import SpinnerLoader from '@/components/shared/SpinnerLoader';
import { colors } from '@/design-system/tokens';
import { trackEvent } from '@/lib/analytics';

import clsx from 'clsx';

type Properties = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  label: string;
  svg?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  eventName?: string;
  eventProperties?: Record<string, string>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>;

const Button = ({
  onClick,
  variant = 'primary',
  label,
  svg,
  loading = false,
  size = 'md',
  className,
  disabled,
  eventName,
  eventProperties,
  asChild = false,
  children,
  ...rest
}: Properties) => {
  const styleSize = clsx(
    size === 'sm' && 'px-4 py-3 text-sm min-h-[48px] min-w-[48px]',
    size === 'md' && 'px-6 py-3.5 text-sm min-h-[48px] min-w-[48px]',
    size === 'lg' && 'px-6 py-4 text-base min-h-[52px] min-w-[52px]',
    size === 'xl' && 'px-8 py-4.5 text-base min-h-[56px] min-w-[56px]'
  );

  const styleVariant = clsx(
    variant === 'primary' &&
      clsx(
        colors.text.primary,
        'bg-gradient-to-br from-primary-800 to-primary-950 hover:from-primary-900 hover:to-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:shadow-glow-md relative overflow-hidden group'
      ),
    variant === 'secondary' &&
      clsx(
        colors.text.primary,
        'relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 hover:border-secondary-500/30 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-md hover:shadow-lg group'
      )
  );

  const buttonClasses = clsx(
    'relative overflow-hidden flex items-center justify-center w-fit whitespace-nowrap rounded-md font-medium',
    'transition-all duration-300 ease-out',
    'hover:scale-105 hover:shadow-xl active:scale-95',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    styleSize,
    styleVariant,
    loading && 'cursor-default',
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onClick?.(event);
    if (eventName) {
      trackEvent(eventName, eventProperties);
    }
  };

  const buttonContent = (
    <>
      {loading && (
        <div className='absolute flex items-center justify-center inset-0 bg-zinc-950'>
          <SpinnerLoader />
        </div>
      )}
      <span className='w-full flex items-center justify-center gap-2 relative z-10'>
        {label}
        <span className='transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-6'>
          {svg}
        </span>
      </span>
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLAnchorElement>>;
    const childClassName = child.props?.className || '';
    const childOnClick = child.props?.onClick;

    return cloneElement(child, {
      ...child.props,
      className: clsx(buttonClasses, childClassName),
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled || loading) {
          e.preventDefault();
          return;
        }
        if (childOnClick) childOnClick(e);
        handleClick(e);
      },
      'aria-label': label,
      ...(disabled || loading ? { 'aria-disabled': true, tabIndex: -1 } : {}),
      children: buttonContent,
    });
  }

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      aria-label={label}
      disabled={disabled || loading}
      type={rest.type || 'button'}
      {...rest}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
