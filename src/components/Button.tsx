'use client';

import SpinnerLoader from './SpinnerLoader';

import clsx from 'clsx';

type Properties = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
} & React.HTMLAttributes<HTMLButtonElement>;

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
  const styleSize = clsx(
    size === 'sm' && 'px-4 py-3 text-sm min-h-[48px]',
    size === 'md' && 'px-6 py-3.5 text-sm min-h-[48px]',
    size === 'lg' && 'px-6 py-4 text-base min-h-[52px]',
    size === 'xl' && 'px-8 py-4.5 text-base min-h-[56px]'
  );

  const styleVariant = clsx(
    variant === 'primary' &&
      'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40',
    variant === 'secondary' &&
      'relative inline-flex items-center justify-center overflow-hidden text-zinc-100 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 focus:ring-2 focus:outline-none focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-md hover:shadow-lg'
  );

  return (
    <button
      className={clsx(
        'relative overflow-hidden flex items-center justify-center w-fit whitespace-nowrap rounded-md font-medium',
        'transition-all duration-300 ease-out',
        'hover:scale-105 hover:shadow-xl active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        styleSize,
        styleVariant,
        loading && 'cursor-default',
        className
      )}
      onClick={event => {
        onClick?.(event);
        if (eventName && 'umami' in globalThis) {
          (
            globalThis as typeof globalThis & {
              umami: { track: (name: string, props?: Record<string, unknown>) => void };
            }
          ).umami.track(eventName, eventProperties);
        }
      }}
      aria-label={label}
      disabled={disabled || loading}
      type={rest.type || 'button'}
      {...rest}
    >
      {loading && (
        <div className='absolute flex items-center justify-center inset-0 bg-zinc-950'>
          <SpinnerLoader />
        </div>
      )}
      <span className='w-full flex items-center justify-center gap-2 '>
        {label}
        {svg}
      </span>
    </button>
  );
};

export default Button;
