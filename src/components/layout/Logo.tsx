import Link from 'next/link';

import { colors } from '@/design-system/tokens';

import clsx from 'clsx';

const Logo = () => (
  <Link href='/' title='Scroll to top' data-umami-event='header_logo_click'>
    <strong className={clsx('flex text-nowrap font-heading text-2xl', colors.text.light)}>
      Kévin Sauvage.
    </strong>
  </Link>
);

export default Logo;
