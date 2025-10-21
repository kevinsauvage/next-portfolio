import { cloneElement } from 'react';

import socialButton from '@/config/socialButton';
import Link from 'next/link';

const ContactInfo = () => (
  <ul className='flex gap-4'>
    {socialButton.map(item => (
      <li key={item.href}>
        <Link
          href={item.href}
          className='text-zinc-100 md:hover:text-blue-400'
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
          })}
        </Link>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
