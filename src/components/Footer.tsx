import Link from 'next/link';

import ContactInfo from '@/components/ContactInfo';

const Footer = () => (
  <footer className="flex flex-col items-center justify-center p-4 gap-4">
    <Link href="/" aria-label="Go to Home page" className="text-2xl font-semibold font-serif">
      Kévin Sauvage
    </Link>
    <ContactInfo />
  </footer>
);

export default Footer;
