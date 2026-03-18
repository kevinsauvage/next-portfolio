import { Card, CardContent, CardHeader, CardIcon } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { Tag } from '@/components/ui/Tag';
import { BodySmall, Caption, H3 } from '@/components/ui/Typography';

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

const Description = ({
  description,
  descriptionArray,
}: {
  description: string;
  descriptionArray?: string[];
}) => {
  const items = descriptionArray?.length ? descriptionArray : [description];

  return (
    <ul className='flex-1 space-y-2 list-none pl-0'>
      {items.map((item, i) => (
        <li key={i} className='flex gap-3'>
          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-500' aria-hidden />
          <BodySmall className='min-w-0 flex-1 transition-colors text-zinc-200 group-hover:text-zinc-200'>
            {item}
          </BodySmall>
        </li>
      ))}
    </ul>
  );
};

const PositionAndPeriod = ({ position, period }: { position: string; period: string }) => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <TrendingUp
          size={16}
          className='text-purple-400 transition-transform group-hover:rotate-12 flex-shrink-0'
          strokeWidth={1.5}
          aria-hidden='true'
          tabIndex={-1}
        />
        <Caption className='font-semibold text-zinc-50'>{position}</Caption>
      </div>
      <Caption className='flex items-center gap-1.5'>
        <Calendar size={14} className='text-zinc-400' aria-hidden='true' tabIndex={-1} />
        <span>{period}</span>
      </Caption>
    </div>
  );
};

const CareerCard: React.FC<CareerCardProps> = ({
  company,
  description,
  descriptionArray,
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
              size={20}
              className='text-blue-400 transition-transform group-hover:rotate-12'
              strokeWidth={1.5}
              aria-hidden='true'
              tabIndex={-1}
            />
          </CardIcon>
          <div className='flex-1'>
            <H3
              id={`career-${index}`}
              size='sm'
              className='transition-colors group-hover:text-primary-400'
            >
              {company}
            </H3>
          </div>
          <NumberBadge number={index + 1} />
        </CardHeader>
        <PositionAndPeriod position={position} period={period} />
        <Description
          description={description ?? ''}
          {...(descriptionArray && { descriptionArray })}
        />
        <SkillsTags skills={skills ?? []} />
      </CardContent>
    </Card>
  );
};

export default CareerCard;
