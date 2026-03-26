import Link from 'next/link';

import { UMAMI_EVENTS } from '@/lib/analytics-events';

const Logo = () => (
  <Link href='/' title='Kévin Sauvage - Home' data-umami-event={UMAMI_EVENTS.NAV_LOGO_CLICK}>
    <strong className='flex text-nowrap font-heading text-2xl text-zinc-100'>Kévin Sauvage.</strong>
  </Link>
);

export default Logo;
