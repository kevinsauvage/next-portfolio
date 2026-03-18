import Link from 'next/link';

const Logo = () => (
  <Link href='/' title='Kévin Sauvage - Home' data-umami-event='header_logo_click'>
    <strong className='flex text-nowrap font-heading text-2xl text-zinc-100'>Kévin Sauvage.</strong>
  </Link>
);

export default Logo;
