import Link from 'next/link';

import { PERSON_NAME } from '@/config/site';
import { ANALYTICS_EVENTS } from '@/lib/analytics/events';

const Logo = () => (
  <Link
    href='/'
    aria-label={`${PERSON_NAME} - Home`}
    data-analytics-event={ANALYTICS_EVENTS.NAV_LOGO_CLICK}
    className='inline-flex min-h-11 items-center'
  >
    <strong className='flex text-nowrap font-heading text-2xl text-zinc-100'>{PERSON_NAME}.</strong>
  </Link>
);

export default Logo;
