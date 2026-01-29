import clsx from 'clsx';

type RequiredIndicatorProps = {
  className?: string;
};

const RequiredIndicator = ({ className }: RequiredIndicatorProps) => {
  return (
    <span className={clsx('absolute -right-3 -top-1 text-2xl text-rose-400', className)}>*</span>
  );
};

export default RequiredIndicator;
