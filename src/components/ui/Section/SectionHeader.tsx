import type { ReactNode } from 'react';

import { Body, H2, Overline } from '@/components/ui/Typography';

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
  const isCentered = align === 'center';

  return (
    <div className={clsx('space-y-6', isCentered ? 'text-center' : 'text-left', className)}>
      {overline && (
        <div className={clsx(isCentered && 'flex justify-center')}>
          <Overline>{overline}</Overline>
        </div>
      )}

      <H2
        gradient={gradient}
        className='animate-gradient bg-[length:200%_auto] text-4xl md:text-5xl lg:text-6xl'
      >
        {title}
      </H2>

      {description && (
        <Body className={clsx('max-w-4xl', isCentered && 'mx-auto')}>{description}</Body>
      )}
    </div>
  );
};

export default SectionHeader;
