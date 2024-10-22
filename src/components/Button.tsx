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
  loading = true,
  className,
  disabled,
  ...rest
}: Properties) => {
  const primaryClass = 'text-white border border-blue-700  bg-blue-600 hover:bg-blue-900';
  const secondaryClass = 'bg-transparent text-blue-900 border border-blue-900 hover:bg-blue-50';

  const buttonClass = {
    primary: primaryClass,
    secondary: secondaryClass,
  };

  return (
    <button
      className={`flex items-center justify-center text-lg font-semibold font-serif rounded p-3 border w-full overflow-hidden relative sm:max-w-44 ${
        buttonClass[variant]
      } ${loading ? 'cursor-default opacity-60' : ''} ${className}`}
      onClick={(event) => onClick?.(event)}
      aria-label={label}
      disabled={disabled || loading}
      type={rest.type || 'button'}
      {...rest}
    >
      {loading && (
        <div className="absolute z-20 flex items-center justify-center inset-0 bg-blue-900">
          loading...
        </div>
      )}
      <span className="relative z-10 flex items-center gap-2">
        {label}
        {svg}
      </span>
    </button>
  );
};

export default Button;
