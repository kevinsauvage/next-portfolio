import { Card, CardContent, CardHeader, CardIcon } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, Caption, H3 } from '@/components/ui/Typography';
import { colors, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, Calendar, TrendingUp } from 'lucide-react';

type CareerCardProps = {
  company: string;
  description?: string;
  descriptionArray?: string[];
  period: string;
  position: string;
  skills?: string[];
  index: number;
};

const SkillsTags = ({ skills }: { skills: string[] }) => {
  return (
    <div className='flex flex-wrap gap-1.5 pt-2 border-zinc-800/50'>
      {skills.map(skill => (
        <Tag key={skill}>{skill}</Tag>
      ))}
    </div>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <BodySmall
      className={clsx(
        'flex-1 transition-colors',
        colors.text.secondary,
        colors.text.groupHover.secondary
      )}
    >
      {description}
    </BodySmall>
  );
};

const PositionAndPeriod = ({ position, period }: { position: string; period: string }) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <TrendingUp
          size={iconSizes.sm}
          className={clsx(
            colors.brandColors.purple,
            'transition-transform group-hover:rotate-12 flex-shrink-0'
          )}
          strokeWidth={1.5}
          aria-hidden='true'
          tabIndex={-1}
        />
        <Caption className={clsx('font-semibold', colors.text.primary)}>{position}</Caption>
      </div>
      <Caption className='flex items-center gap-1.5'>
        <Calendar
          size={iconSizes.xs}
          className={colors.text.muted}
          aria-hidden='true'
          tabIndex={-1}
        />
        <span>{period}</span>
      </Caption>
    </div>
  );
};

const CareerCard: React.FC<CareerCardProps> = ({
  company,
  description,
  period,
  position,
  skills,
  index,
}) => {
  return (
    <Card
      hover='subtle'
      size='md'
      glow='primary-secondary'
      animationIndex={index}
      aria-labelledby={`career-${index}`}
      className='group relative h-full'
    >
      <CardContent spacing='lg' className='h-full flex flex-col'>
        <CardHeader withBorder>
          <CardIcon variant='blue'>
            <Briefcase
              size={iconSizes.md}
              className={clsx(colors.status.info, 'transition-transform group-hover:rotate-12')}
              strokeWidth={1.5}
              aria-hidden='true'
              tabIndex={-1}
            />
          </CardIcon>
          <div className='flex-1'>
            <H3
              id={`career-${index}`}
              size='sm'
              className={clsx('transition-colors', colors.brandColors.groupHover.primary400)}
            >
              {company}
            </H3>
          </div>
          <NumberBadge number={index + 1} />
        </CardHeader>
        <PositionAndPeriod position={position} period={period} />
        <Description description={description ?? ''} />
        <SkillsTags skills={skills ?? []} />
      </CardContent>
    </Card>
  );
};

export default CareerCard;
