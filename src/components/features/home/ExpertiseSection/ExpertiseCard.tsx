import { Card, CardContent } from '@/components/ui/Card';
import { Check } from 'lucide-react';

type ExpertiseCardProps = {
  title: string;
  content: string;
  keyPoints: string[];
  index: number;
};

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, content, keyPoints, index }) => {
  return (
    <Card
      hover='subtle'
      size='md'
      glow='primary-secondary'
      animationIndex={index}
      className='group relative h-full'
    >
      <CardContent spacing='lg' className='relative z-10 h-full'>
        <div className='space-y-6'>
          <div className='space-y-3'>
            <h3 className='text-2xl font-bold text-zinc-100 group-hover:text-accent-400 transition-all duration-300'>
              {title}
            </h3>
            <p className='text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors'>
              {content}
            </p>
          </div>
          <ul className='space-y-3' aria-label='Key points'>
            {keyPoints.map(point => (
              <li key={point} className='flex items-center gap-3'>
                <div className='mt-0.5 flex-shrink-0'>
                  <div className='p-1 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300'>
                    <Check className='w-3.5 h-3.5 text-white' aria-hidden='true' />
                  </div>
                </div>
                <span className='text-zinc-300 group-hover:text-zinc-200 transition-colors'>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertiseCard;
