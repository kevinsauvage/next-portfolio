import clsx from 'clsx';

type SectionProperties = {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
} & React.HTMLAttributes<HTMLElement>;

const Section: React.FC<SectionProperties> = ({
  children,
  className,
  spacing = 'md',
  ...properties
}) => {
  const spacingClass = (() => {
    switch (spacing) {
      case 'sm':
        return 'py-16 md:py-24';
      case 'md':
        return 'py-20 md:py-32';
      case 'lg':
        return 'py-24 md:py-40';
      case 'xl':
        return 'py-32 md:py-48';
      default:
        return 'py-20 md:py-32';
    }
  })();
  return (
    <section className={clsx('max-w-5xl m-auto w-full', spacingClass, className)} {...properties}>
      {children}
    </section>
  );
};

export default Section;
