import clsx from 'clsx';

type SectionProperties = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const Section: React.FC<SectionProperties> = ({ children, className, ...properties }) => {
  return (
    <section
      className={clsx('max-w-5xl m-auto w-full py-20 scroll-m-10', className)}
      {...properties}
    >
      {children}
    </section>
  );
};

export default Section;
