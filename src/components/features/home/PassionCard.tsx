import type { ElementType } from 'react';

import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { BodySmall, H3 } from '@/components/ui/Typography';

type PassionCardProps = {
  icon: ElementType;
  title: string;
  description: string;
};

const PassionCard: React.FC<PassionCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card hover='subtle' size='md' glow='secondary-accent' className='h-full' aria-label={title}>
      <CardContent spacing='md'>
        <CardIcon variant='primary'>
          <Icon
            className='text-zinc-50 transition-transform group-hover:rotate-12'
            size={24}
            strokeWidth={1.5}
            aria-hidden='true'
          />
        </CardIcon>
        <H3 size='sm' className='transition-colors'>
          {title}
        </H3>
        <BodySmall className='transition-colors'>{description}</BodySmall>
      </CardContent>
    </Card>
  );
};

export default PassionCard;
