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
  ...rest
}: Properties) => {
  const styleSize = clsx(
    size === 'sm' && 'px-3 py-2 text-sm',
    size === 'md' && 'px-5 py-2.5 text-sm',
    size === 'lg' && 'px-5 py-3 text-base',
    size === 'xl' && 'px-6 py-3.5 text-base',
  );

  const styleVariant = clsx(
    variant === 'primary' &&
      'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium px-5 py-2.5 text-center me-2 mb-2',
    variant === 'secondary' &&
      'relative inline-flex items-center justify-center  px-5 py-2.5 mb-2 me-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800',
  );

  return (
    <button
      className={clsx(
        'relative overflow-hidden flex items-center justify-center w-fit whitespace-nowrap rounded-md font-medium',
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
