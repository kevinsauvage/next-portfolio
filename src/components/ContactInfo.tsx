import { cloneElement } from 'react';
import Link from 'next/link';

import socialButton from '@/config/socialButton';

const ContactInfo = () => (
  <ul className='flex gap-3 flex-wrap'>
    {socialButton.map(item => (
      <li key={item.href}>
        <Link
          href={item.href}
          className='text-zinc-200 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 group min-w-[48px] min-h-[48px] p-3'
          aria-label={`Visit ${item.text} profile`}
          target='_blank'
          prefetch={false}
          rel='noopener noreferrer'
          title={`${item.text} profile`}
          data-umami-event='footer_social_click'
          data-umami-event-label={item.text}
        >
          {cloneElement(item.icon, {
            'aria-hidden': 'true',
            size: 24,
            className: 'transition-transform duration-300 hover:rotate-12',
          })}
        </Link>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
