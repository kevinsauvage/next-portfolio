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
  const spacingClass = (() => {
    switch (spacing) {
      case 'sm':
        return sectionSpacing.sm;
      case 'md':
        return sectionSpacing.md;
      case 'lg':
        return sectionSpacing.lg;
      case 'xl':
        return sectionSpacing.xl;
      default:
        return sectionSpacing.md;
    }
  })();
  return (
    <section
      className={clsx(
        containerSpacing.maxWidth,
        containerSpacing.margin,
        'w-full',
        spacingClass,
        className
      )}
      {...properties}
    >
      {children}
    </section>
  );
};

export default Section;
