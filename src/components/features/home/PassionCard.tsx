import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { BodySmall, H3 } from '@/components/ui/Typography';
import { colors, iconSizes } from '@/design-system/tokens';

import clsx from 'clsx';

type PassionCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
};

const PassionCard: React.FC<PassionCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <Card
      hover='subtle'
      size='md'
      glow='secondary-accent'
      animationIndex={index}
      aria-label={title}
    >
      <CardContent spacing='md'>
        <CardIcon variant='primary'>
          <Icon
            className={clsx(colors.text.primary, 'transition-transform group-hover:rotate-12')}
            size={iconSizes.lg}
            strokeWidth={1.5}
            aria-hidden='true'
          />
        </CardIcon>
        <H3 size='sm' className={clsx('transition-all duration-300')}>
          {title}
        </H3>
        <BodySmall className={clsx(colors.text.groupHover.secondary, 'transition-colors')}>
          {description}
        </BodySmall>
      </CardContent>
    </Card>
  );
};

export default PassionCard;
