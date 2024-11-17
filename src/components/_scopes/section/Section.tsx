import clsx from 'clsx';

type SectionProperties = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const Section: React.FC<SectionProperties> = ({ children, className, ...properties }) => {
  return (
    <section className={clsx('max-w-5xl m-auto w-full pb-20 pt-32', className)} {...properties}>
      {children}
    </section>
  );
};

export default Section;
