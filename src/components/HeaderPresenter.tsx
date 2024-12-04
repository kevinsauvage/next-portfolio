import { cookies } from 'next/headers';

import { getDictionary } from '@/dictionaries/dictionaries';
import { cookieName } from '@/middleware';

import Header from './Header';

const HeaderPresenter = async () => {
  const lang = cookies().get(cookieName)?.value || 'en';
  const t = await getDictionary(lang);

  return (
    <header className="absolute top-3 left-0 z-50 w-full bg-opacity-95">
      <div className="flex justify-between m-auto items-center xl:container p-4">
        <Header translations={t.shared.header} lang={lang} />
      </div>
    </header>
  );
};

export default HeaderPresenter;
