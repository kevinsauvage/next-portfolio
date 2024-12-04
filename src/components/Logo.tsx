import Link from 'next/link';

const Logo = ({ lang }: { lang: string }) => (
  <Link href={`/${lang}`} title="Scroll to top">
    <strong className="flex text-nowrap font-heading text-2xl text-zinc-300">Kévin Sauvage.</strong>
  </Link>
);

export default Logo;
