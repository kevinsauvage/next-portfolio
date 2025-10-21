import { cloneElement } from 'react';
import Link from 'next/link';

import socialButton from '@/config/socialButton';

const ContactInfo = () => (
  <ul className='flex gap-4 flex-wrap'>
    {socialButton.map(item => (
      <li key={item.href}>
        <Link
          href={item.href}
          className='text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2 group'
          aria-label={`${item.text} on a new page`}
          target='_blank'
          prefetch={false}
          rel='noopener noreferrer'
          title={`${item.text} profile`}
          data-umami-event='footer_social_click'
          data-umami-event-label={item.text}
        >
          {cloneElement(item.icon, {
            'aria-label': item.text,
            size: 24,
          })}
        </Link>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
