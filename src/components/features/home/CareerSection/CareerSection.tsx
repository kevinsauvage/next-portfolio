import { Card, CardContent, CardHeader, CardIcon } from '@/components/ui/Card';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Body, Caption, H3, H4 } from '@/components/ui/Typography';
import { jobs, sections } from '@/config/content';
import { gapSpacing, iconSizes, stackSpacing } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

const CareerItem: React.FC<{
  company: string;
  description?: string;
  descriptionArray?: string[];
  period: string;
  position: string;
  location?: string;
  index: number;
}> = ({ company, description, period, position, location, index }) => {
  return (
    <Card
      hover='subtle'
      size='md'
      glow='primary-secondary'
      animationIndex={index}
      aria-labelledby={`career-${index}`}
    >
      <CardContent spacing='lg'>
        <CardHeader withBorder>
          <CardIcon variant='blue'>
            <Briefcase
              size={iconSizes.md}
              className='text-blue-400 transition-transform group-hover:rotate-12'
              strokeWidth={1.5}
              aria-hidden='true'
            />
          </CardIcon>
          <div className='flex-1'>
            <H3 id={`career-${index}`} className='group-hover:text-blue-400 transition-colors'>
              {company}
            </H3>
          </div>
          <Caption className='text-blue-400 whitespace-nowrap'>
            {String(index + 1).padStart(2, '0')}
          </Caption>
        </CardHeader>

        <div className={stackSpacing.xs}>
          <div className={clsx(gapSpacing.xs, 'flex items-center')}>
            <TrendingUp
              size={iconSizes.sm}
              className='text-purple-400 transition-transform group-hover:rotate-12'
              strokeWidth={1.5}
              aria-hidden='true'
            />
            <H4>{position}</H4>
          </div>
          <div className={clsx(gapSpacing.sm, 'flex flex-wrap')}>
            <Caption className='flex items-center gap-2'>
              <Calendar size={iconSizes.xs} className='text-zinc-500' aria-hidden='true' />
              <span>{period}</span>
            </Caption>
            {location && (
              <Caption className='flex items-center gap-2'>
                <MapPin size={iconSizes.xs} className='text-zinc-500' aria-hidden='true' />
                <span>{location}</span>
              </Caption>
            )}
          </div>
        </div>

        <Body>{description}</Body>
      </CardContent>
    </Card>
  );
};

const CareerSection = () => {
  return (
    <Section id='career'>
      <div className={stackSpacing['2xl']}>
        <SectionHeader
          overline={sections.career.overline}
          title={sections.career.title}
          description={sections.career.description}
        />

        <div className={stackSpacing.lg}>
          {jobs.map((job, index) => (
            <CareerItem key={index} {...job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CareerSection;
