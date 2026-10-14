'use client';

import SpinnerLoader from '@/components/shared/SpinnerLoader';
import { trackEvent } from '@/lib/analytics';

import ButtonContent from './ButtonContent';
import { type ButtonSize, type ButtonVariant, getButtonClasses } from './buttonStyles';

type Properties = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  svg?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  eventName?: string;
  eventProperties?: Record<string, string>;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'>;

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
  ...rest
}: Properties) => {
  const buttonClasses = getButtonClasses(variant, size, loading, className);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (eventName) {
      trackEvent(eventName, eventProperties);
    }
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type={rest.type || 'button'}
      {...rest}
    >
      {loading && (
        <div className='absolute flex items-center justify-center inset-0 bg-zinc-950'>
          <SpinnerLoader />
        </div>
      )}
      <ButtonContent label={label} svg={svg} />
    </button>
  );
};

export default Button;
