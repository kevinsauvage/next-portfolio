import { cloneElement } from 'react';

import socialButton from '@/config/socialButton';
import { Link } from '@/i18n/routing';

const ContactInfo = () => (
  <ul className="flex gap-4">
    {socialButton.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          className="text-zinc-300 md:hover:text-blue-500"
          aria-label={`${item.text} on a new page`}
          target="_blank"
          prefetch={false}
          rel="noopener noreferrer"
          title={`${item.text} profile`}
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
