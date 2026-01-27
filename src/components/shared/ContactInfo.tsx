import { cloneElement } from 'react';
import Link from 'next/link';

import socialButton from '@/config/ui/social';
import { colors } from '@/design-system/tokens';

import clsx from 'clsx';

type ContactInfoProps = {
  size?: number;
  eventPrefix?: string;
  className?: string;
};

const ContactInfo = ({ size = 24, eventPrefix = 'footer', className }: ContactInfoProps) => (
  <ul className={clsx('flex gap-3 flex-wrap', className)}>
    {socialButton.map(item => (
      <li key={item.href}>
        <Link
          href={item.href}
          className={clsx(
            colors.text.secondary,
            colors.status.hover.info,
            'transition-colors flex items-center justify-center gap-2 group min-w-[48px] min-h-[48px] p-3'
          )}
          aria-label={item.ariaLabel}
          title={item.ariaLabel}
          target='_blank'
          prefetch={false}
          rel='noopener noreferrer'
          data-umami-event={`${eventPrefix}_social_click`}
          data-umami-event-label={item.text}
        >
          {cloneElement(item.icon, {
            'aria-hidden': 'true',
            size,
            className: 'transition-transform duration-300 hover:rotate-12',
          })}
        </Link>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
