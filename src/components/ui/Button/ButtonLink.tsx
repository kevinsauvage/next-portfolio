'use client';

import Link from 'next/link';

import { trackEvent } from '@/lib/analytics';

import { type ButtonSize, type ButtonVariant, getButtonClasses } from './buttonStyles';

import clsx from 'clsx';

type ButtonLinkProps = {
  label: string;
  svg?: React.ReactNode;
  variant?: ButtonVariant;
  eventName?: string;
  eventProperties?: Record<string, string>;
  size?: ButtonSize;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<typeof Link>;

const ButtonLink = ({
  variant = 'primary',
  label,
  svg,
  size = 'md',
  className,
  disabled,
  eventName,
  eventProperties,
  onClick,
  ...rest
}: ButtonLinkProps) => {
  const buttonClasses = getButtonClasses(variant, size, false, className);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
    if (eventName) {
      trackEvent(eventName, eventProperties);
    }
  };

  const buttonContent = (
    <span className='w-full flex items-center justify-center gap-2 relative z-10'>
      {label}
      <span className='transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-6'>
        {svg}
      </span>
    </span>
  );

  return (
    <Link
      className={clsx(
        buttonClasses,
        disabled && 'pointer-events-none opacity-50 cursor-not-allowed'
      )}
      onClick={handleClick}
      aria-label={label}
      aria-disabled={disabled}
      {...rest}
    >
      {buttonContent}
    </Link>
  );
};

export default ButtonLink;
