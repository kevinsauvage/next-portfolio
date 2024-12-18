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
  size?: 'sm' | 'md' | 'lg';
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
  ...rest
}: Properties) => {
  const styleSize = clsx(
    'text-lg',
    size === 'md' && 'text-md',
    size === 'sm' && 'text-sm',
    size === 'lg' && 'text-xl',
  );

  const styleVariant = clsx(
    variant === 'primary' &&
      'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2',
    variant === 'secondary' &&
      'text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2',
  );

  return (
    <button
      className={clsx(
        'relative overflow-hidden flex items-center justify-center w-fit whitespace-nowrap rounded-md px-4 py-3 border',
        styleSize,
        styleVariant,
        loading && 'cursor-default',
        className,
      )}
      onClick={(event) => onClick?.(event)}
      aria-label={label}
      disabled={disabled || loading}
      type={rest.type || 'button'}
      {...rest}
    >
      {loading && (
        <div className="absolute flex items-center justify-center inset-0 bg-zinc-950">
          <SpinnerLoader />
        </div>
      )}
      <span className="w-full flex items-center justify-center gap-2 ">
        {label}
        {svg}
      </span>
    </button>
  );
};

export default Button;
