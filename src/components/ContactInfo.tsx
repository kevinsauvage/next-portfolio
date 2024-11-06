import Link from 'next/link';

import socialButton from '@/config/socialButton';

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
          {item.icon}
        </Link>
      </li>
    ))}
  </ul>
);

export default ContactInfo;
