import Link from 'next/link';

import AnimatedContainer from '@/components/AnimatedContainer';
import renderLetters from '@/utils/renderLetters';

const Logo = () => (
  <AnimatedContainer
    Tag="h1"
    from={{ ease: 'sine.out', opacity: 0, y: 50 }}
    to={{
      duration: 0.3,
      ease: 'sine.out',
      opacity: 1,
      stagger: {
        amount: 0.5,
        each: 0.1,
      },
      y: 0,
    }}
    triggerClassName=".char"
  >
    <Link href="/" title="Scroll to top">
      <strong className="flex text-nowrap text-4xl text-slate-50 font-serif">
        {renderLetters('Kévin Sauvage')}
      </strong>
    </Link>
  </AnimatedContainer>
);

export default Logo;
