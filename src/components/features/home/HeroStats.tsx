import ContactInfo from '@/components/shared/ContactInfo';
import { BodySmall } from '@/components/ui/Typography';
import { sections } from '@/config/content';

import { Sparkles } from 'lucide-react';

/** Stats strip + social links; rendered once in the first fold (md+) and once below it on mobile. */
const HeroStats = () => (
  <>
    <div className='card-enter grid grid-cols-3 max-w-2xl mx-auto pt-8 border-t border-zinc-800/50 backdrop-blur-sm gap-4 md:gap-8'>
      {sections.hero.stats.map(stat => (
        <div
          key={stat.label}
          className='flex flex-col items-center group hover:scale-110 transition-transform duration-300'
        >
          <div className='text-2xl md:text-3xl font-bold mb-1 flex items-center gap-1 font-mono text-zinc-50'>
            {stat.value}
            {'highlight' in stat && (
              <Sparkles
                size={20}
                className='text-accent-400 group-hover:animate-spin'
                aria-hidden='true'
              />
            )}
          </div>
          <BodySmall className='text-center md:text-base font-light transition-colors group-hover:text-zinc-100'>
            {stat.label}
          </BodySmall>
        </div>
      ))}
    </div>

    <div className='card-enter mt-8'>
      <ContactInfo size={22} eventPrefix='hero' className='justify-center' />
    </div>
  </>
);

export default HeroStats;
