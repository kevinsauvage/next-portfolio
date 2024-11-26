'use client';

import clsx from 'clsx';

type Properties = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  svg?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = ({
  onClick,
  variant = 'primary',
  label,
  svg,
  loading = false,
  className,
  disabled,
  ...rest
}: Properties) => {
  return (
    <button
      className={clsx(
        'relative overflow-hidden flex items-center justify-center text-lg font-normal w-fit whitespace-nowrap rounded-md px-4 py-2 border border-zinc-400 sm:max-w-44',
        variant === 'primary' ? 'text-zinc-100 bg-zinc-950' : '',
        variant === 'secondary' ? 'text-blue-900' : '',
        loading ? 'cursor-default opacity-60' : '',
        className,
      )}
      onClick={(event) => onClick?.(event)}
      aria-label={label}
      disabled={disabled || loading}
      type={rest.type || 'button'}
      {...rest}
    >
      {loading && (
        <div className="absolute flex items-center justify-center inset-0 bg-zinc-900 text-zinc-100">
          loading...
        </div>
      )}
      <span className="w-full flex items-center justify-center gap-2 text-zinc-300">
        {label}
        {svg}
      </span>
    </button>
  );
};

export default Button;
