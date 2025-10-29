import { Card, CardContent, CardIcon } from '@/components/ui/Card';
import { Body, H4 } from '@/components/ui/Typography';
import { iconSizes } from '@/design-system/tokens';

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
            className='text-white transition-transform group-hover:rotate-12'
            size={iconSizes.lg}
            strokeWidth={1.5}
            aria-hidden='true'
          />
        </CardIcon>
        <H4 className='group-hover:text-accent-400 transition-all duration-300'>{title}</H4>
        <Body className='group-hover:text-zinc-200 transition-colors'>{description}</Body>
      </CardContent>
    </Card>
  );
};

export default PassionCard;
