import { Link } from '@/i18n/routing';

const Logo = () => (
  <Link href="/" title="Scroll to top" data-umami-event="header_logo_click">
    <strong className="flex text-nowrap font-heading text-2xl text-zinc-300">Kévin Sauvage.</strong>
  </Link>
);

export default Logo;
