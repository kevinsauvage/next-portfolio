import Image from 'next/image';

import ButtonLink from '@/components/ui/Button/ButtonLink';
import { Body, Display } from '@/components/ui/Typography';

import { Home } from 'lucide-react';

const Custom404 = () => {
  return (
    <div className='flex min-h-dvh flex-col-reverse items-center justify-center gap-10 p-4 md:grid md:grid-cols-2 lg:p-20 container m-auto'>
      <div className='col-span-1'>
        <Display className='mb-2 max-w-5xl'>Oops! Page Not Found</Display>
        <Body className='mb-5 max-w-xl'>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </Body>
        <ButtonLink
          href='/'
          label='Go Back Home'
          svg={<Home size={18} aria-hidden='true' />}
          size='lg'
          variant='primary'
          className='w-fit font-semibold'
        />
      </div>
      <Image
        src='/images/404.svg'
        alt=''
        aria-hidden='true'
        width={400}
        height={400}
        className='col-span-1 h-auto w-full'
        priority
      />
    </div>
  );
};

export default Custom404;
