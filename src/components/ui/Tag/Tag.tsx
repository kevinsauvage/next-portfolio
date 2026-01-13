import clsx from 'clsx';

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export const Tag = ({ children, className }: TagProps) => (
  <span
    className={clsx(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
      'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
      'transition-all duration-300',
      'group-hover:bg-primary-950/50 group-hover:border-primary-700/40 group-hover:text-primary-200',
      className
    )}
  >
    {children}
  </span>
);

export default Tag;
