import { containerSpacing, sectionSpacing } from '@/design-system/tokens';

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
  return (
    <section
      className={clsx(
        containerSpacing.maxWidth,
        containerSpacing.margin,
        'w-full',
        sectionSpacing[spacing],
        className
      )}
      {...properties}
    >
      {children}
    </section>
  );
};

export default Section;
