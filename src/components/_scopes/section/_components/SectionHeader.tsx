import clsx from 'clsx';

const SectionHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => <div className={clsx('pb-8 w-full', className)}>{children}</div>;

export default SectionHeader;
