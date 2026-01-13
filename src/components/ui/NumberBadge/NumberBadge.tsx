import clsx from 'clsx';

type NumberBadgeProps = {
  number: number;
  className?: string;
};

export const NumberBadge = ({ number, className }: NumberBadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold',
      'bg-gradient-to-br from-primary-600 to-secondary-600',
      'text-white shadow-lg shadow-primary-500/25',
      'transition-all duration-300',
      'group-hover:shadow-primary-500/40 group-hover:scale-110',
      className
    )}
  >
    {String(number).padStart(2, '0')}
  </span>
);

export default NumberBadge;
