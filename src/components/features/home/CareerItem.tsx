import { Card, CardContent, CardHeader, CardIcon } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, Caption, H4 } from '@/components/ui/Typography';
import { colors, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

type CareerItemProps = {
  company: string;
  description?: string;
  descriptionArray?: string[];
  period: string;
  position: string;
  location?: string;
  skills?: string[];
  index: number;
};

const CareerItem: React.FC<CareerItemProps> = ({
  company,
  description,
  period,
  position,
  location,
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
            <H4
              id={`career-${index}`}
              className={clsx('transition-colors', colors.brandColors.groupHover.primary400)}
            >
              {company}
            </H4>
          </div>
          <NumberBadge number={index + 1} />
        </CardHeader>

        {/* Position & Meta */}
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
          <div className='flex flex-wrap gap-3'>
            <Caption className='flex items-center gap-1.5'>
              <Calendar
                size={iconSizes.xs}
                className={colors.text.muted}
                aria-hidden='true'
                tabIndex={-1}
              />
              <span>{period}</span>
            </Caption>
            {location && (
              <>
                <span className='text-zinc-600 text-xs'>•</span>
                <Caption className='flex items-center gap-1.5'>
                  <MapPin
                    size={iconSizes.xs}
                    className={colors.text.muted}
                    aria-hidden='true'
                    tabIndex={-1}
                  />
                  <span>{location}</span>
                </Caption>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <BodySmall
          className={clsx(
            'flex-1 transition-colors',
            colors.text.secondary,
            colors.text.groupHover.secondary
          )}
        >
          {description}
        </BodySmall>

        {/* Skills Tags */}
        {skills && skills.length > 0 && (
          <div className='flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/50'>
            {skills.map(skill => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerItem;
