import { NEW_TAB_LABEL } from '@/components/ui/NewTabHint';
import { socialLinks } from '@/config/content/social';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';

type ContactInfoProps = {
  size?: number;
  eventPrefix?: string;
  className?: string;
};

const ContactInfo = ({ size = 24, eventPrefix = 'footer', className }: ContactInfoProps) => (
  <ul className={clsx('flex gap-3 flex-wrap', className)}>
    {socialLinks.map(({ id, href, icon: Icon, ariaLabel }) => (
      <li key={id}>
        <a
          href={href}
          className='text-zinc-200 hover:text-primary-400 transition-colors flex items-center justify-center gap-2 group min-w-[48px] min-h-[48px] p-3'
          aria-label={`${ariaLabel} (${NEW_TAB_LABEL})`}
          title={`${ariaLabel} (${NEW_TAB_LABEL})`}
          target='_blank'
          rel='noopener noreferrer'
          data-analytics-event={ANALYTICS_EVENTS.SOCIAL_LINK_CLICK}
          data-analytics-location={eventPrefix}
          data-analytics-network={id}
        >
          <Icon size={size} className='transition-transform duration-300 hover:rotate-12' />
        </a>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
