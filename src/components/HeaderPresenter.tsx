import { getDictionary } from '@/app/[lang]/dictionaries';

import Header from './Header';

const HeaderPresenter = async ({ lang }: { lang: string }) => {
  const t = await getDictionary(lang);

  return (
    <header className="absolute top-3 left-0 z-50 w-full bg-opacity-95">
      <div className="flex justify-between m-auto items-center xl:container p-4">
        <Header lang={lang} translations={t.shared.header} />
      </div>
    </header>
  );
};

export default HeaderPresenter;
