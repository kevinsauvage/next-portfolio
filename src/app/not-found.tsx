import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { getDictionary } from '@/dictionaries/dictionaries';
import { cookieName, defaultLocale } from '@/middleware';

const Custom404 = async () => {
  const lang = cookies().get(cookieName)?.value;
  const t = await getDictionary(lang || defaultLocale);

  return (
    <div className="flex flex-col-reverse justify-center p-4 md:grid md:grid-cols-2 gap-10 items-center min-h-dvh container m-auto lg:p-20">
      <div className="col-span-1">
        <h1 className="text-4xl font-bold font-heading flex flex-col mb-2 text-zinc-300  max-w-5xl sm:text-5xl sm:leading-snug md:text-6xl md:leading-snug xl:text-7xl leading-snug xl:leading-tight">
          {t?.[404].title}
        </h1>
        <p className="text-lg font-extralight mb-5 text-zinc-400 max-w-xl md:text-2xl">
          {t?.[404].description}
        </p>
        <Link
          href={`/${lang}`}
          className="w-fit flex rounded-md gap-2 items-center justify-center bg-indigo-800 border border-indigo-900 text-zinc-300 px-10 py-4 text-lg 
               font-semibold hover:bg-indigo-900 hover:border-indigo-900 hover:text-zinc-200 hover:shadow-[0_20px_50px_rgba(55,_48,_163,_0.7)]
               focus:bg-indigo-800 focus:border-indigo-800 focus:text-zinc-200 
               active:bg-indigo-800 active:border-indigo-800 active:text-zinc-200"
        >
          {t?.[404].cta}
        </Link>
      </div>
      <Image
        src="/images/404.svg"
        alt="404"
        width={400}
        height={400}
        className="w-full h-ful col-span-1"
        priority
      />
    </div>
  );
};

export default Custom404;
