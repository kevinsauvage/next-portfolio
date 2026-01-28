import Link from 'next/link';

import Logo from '@/components/layout/Logo';
import MobileMenuToggle from '@/components/layout/MobileMenuToggle';
import Navigation from '@/components/layout/Navigation';
import ContactInfo from '@/components/shared/ContactInfo';
import Button from '@/components/ui/Button';
import { layout } from '@/config/content';

import { Mail } from 'lucide-react';

const Header = () => {
  return (
    <header
      className='w-full fixed top-0 z-40 transition-all duration-300 bg-transparent border-b border-transparent [.page-scrolled_&]:bg-zinc-950/80 [.page-scrolled_&]:backdrop-blur-md [.page-scrolled_&]:border-zinc-800/50'
      role='banner'
      aria-label='Main navigation'
    >
      <div className='flex justify-between m-auto items-center xl:container px-6 py-4 gap-2 sm:gap-4'>
        <Logo />
        <div className='flex-1 min-w-0 flex justify-center'>
          <Navigation />
        </div>
        <div className='flex gap-2 sm:gap-3 items-center justify-end flex-shrink-0'>
          <div className='hidden xl:flex items-center gap-2'>
            <ContactInfo size={20} eventPrefix='header' className='mr-2' />
          </div>
          <Button
            asChild
            svg={<Mail strokeWidth={1.5} size={18} />}
            label={layout.header.ctaButton}
            size='md'
            variant='primary'
            data-umami-event='header_cta_contact'
            className='hidden lg:block font-semibold whitespace-nowrap'
          >
            <Link href='#contact' />
          </Button>
          <MobileMenuToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
