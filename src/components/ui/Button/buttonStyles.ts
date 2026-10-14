import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const getButtonSizeClasses = (size: ButtonSize): string => {
  return clsx(
    size === 'sm' && 'px-4 py-3 text-sm min-h-[48px] min-w-[48px]',
    size === 'md' && 'px-6 py-3.5 text-sm min-h-[48px] min-w-[48px]',
    size === 'lg' && 'px-6 py-4 text-base min-h-[52px] min-w-[52px]',
    size === 'xl' && 'px-8 py-4.5 text-base min-h-[56px] min-w-[56px]'
  );
};

const getButtonVariantClasses = (variant: ButtonVariant): string => {
  return clsx(
    variant === 'primary' &&
      clsx(
        'text-zinc-950 font-semibold rounded-md',
        'bg-primary-500 hover:bg-primary-400 focus:ring-2 focus:outline-none focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-black shadow-lg shadow-primary-500/25 hover:shadow-glow-md group'
      ),
    variant === 'secondary' &&
      clsx(
        'text-zinc-100',
        'rounded-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:border-primary-700/50 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-black shadow-md hover:shadow-lg group'
      )
  );
};

const getButtonBaseClasses = (className?: string): string => {
  return clsx(
    'relative overflow-hidden flex items-center justify-center w-fit whitespace-nowrap font-medium cursor-pointer',
    'transition-all duration-300 ease-out',
    'hover:scale-105 hover:shadow-xl active:scale-95',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    className
  );
};

export const getButtonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string
): string => {
  return clsx(
    getButtonBaseClasses(className),
    getButtonSizeClasses(size),
    getButtonVariantClasses(variant)
  );
};
