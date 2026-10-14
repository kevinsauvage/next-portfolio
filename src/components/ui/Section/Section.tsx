import Reveal from '@/components/shared/Reveal';

import clsx from 'clsx';

type SectionProperties = {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  /** Set to false to opt out of the scroll-reveal entrance. */
  reveal?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const SPACING_CLASSES = {
  sm: 'py-16 md:py-24',
  md: 'py-20 md:py-32',
  lg: 'py-24 md:py-40',
  xl: 'py-32 md:py-48',
} as const;

const Section: React.FC<SectionProperties> = ({
  children,
  className,
  spacing = 'md',
  reveal = true,
  ...properties
}) => {
  return (
    <section
      // eslint-disable-next-line security/detect-object-injection -- keyed by a typed union
      className={clsx('max-w-5xl m-auto w-full px-6', SPACING_CLASSES[spacing], className)}
      {...properties}
    >
      {reveal ? <Reveal>{children}</Reveal> : children}
    </section>
  );
};

export default Section;
