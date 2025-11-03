import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { Body, H4 } from '@/components/ui/Typography';
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
        <H4 className={clsx(colors.accent.groupHover, 'transition-all duration-300')}>{title}</H4>
        <Body className={clsx(colors.text.groupHover.secondary, 'transition-colors')}>
          {description}
        </Body>
      </CardContent>
    </Card>
  );
};

export default PassionCard;
