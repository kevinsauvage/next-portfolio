'use client';

import { type AnalyticsEventName, trackEvent } from '@/lib/analytics';

import ButtonContent from './ButtonContent';
import { type ButtonSize, type ButtonVariant, getButtonClasses } from './buttonStyles';

type Properties = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  svg?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  eventName?: AnalyticsEventName;
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
  size = 'md',
  className,
  disabled,
  eventName,
  eventProperties,
  ...rest
}: Properties) => {
  const buttonClasses = getButtonClasses(variant, size, className);

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
      disabled={disabled}
      type={rest.type || 'button'}
      {...rest}
    >
      <ButtonContent label={label} svg={svg} />
    </button>
  );
};

export default Button;
