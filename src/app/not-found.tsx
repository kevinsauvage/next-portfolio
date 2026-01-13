import Image from 'next/image';
import Link from 'next/link';

import { Body, Display } from '@/components/ui/Typography';
import { colors } from '@/design-system/tokens';

import clsx from 'clsx';

const Custom404 = () => {
  return (
    <div className='flex flex-col-reverse justify-center p-4 md:grid md:grid-cols-2 gap-10 items-center min-h-dvh container m-auto lg:p-20'>
      <div className='col-span-1'>
        <Display className='mb-2 max-w-5xl'>Oops! Page Not Found</Display>
        <Body className='mb-5 max-w-xl'>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </Body>
        <Link
          href='/'
          className={clsx(
            'w-fit flex rounded-md gap-2 items-center justify-center bg-primary-800 border border-primary-900 px-10 py-4 text-lg font-semibold hover:bg-primary-900 hover:border-primary-900 hover:shadow-[0_20px_50px_rgba(14,_165,_233,_0.4)] focus:bg-primary-800 focus:border-primary-800 active:bg-primary-800 active:border-primary-800',
            colors.text.tertiary,
            colors.text.hover.secondary,
            colors.text.hover.secondary.replace('hover:', 'focus:'),
            colors.text.hover.secondary.replace('hover:', 'active:')
          )}
        >
          Go Back Home
        </Link>
      </div>
      <Image
        src='/images/404.svg'
        alt='404'
        width={400}
        height={400}
        className='w-full h-ful col-span-1'
        priority
      />
    </div>
  );
};

export default Custom404;
