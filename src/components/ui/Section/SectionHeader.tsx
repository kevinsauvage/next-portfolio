import type { ReactNode } from 'react';

import { BodyLarge, H2, Overline } from '@/components/ui/Typography';
import { stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';

type SectionHeaderProps = {
  overline?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
  gradient?: boolean;
  align?: 'left' | 'center';
};

const SectionHeader = ({
  overline,
  title,
  description,
  className,
  gradient = true,
  align = 'center',
}: SectionHeaderProps) => {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={clsx(stackSpacing.md, alignmentClass, className)}>
      {overline && <Overline>{overline}</Overline>}

      <H2
        gradient={gradient}
        className='animate-gradient bg-[length:200%_auto] text-4xl md:text-5xl lg:text-6xl'
      >
        {title}
      </H2>

      {description && <BodyLarge className='max-w-4xl mx-auto'>{description}</BodyLarge>}
    </div>
  );
};

export default SectionHeader;
