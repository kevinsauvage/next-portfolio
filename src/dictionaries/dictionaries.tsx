import 'server-only';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale in dictionaries) {
    return dictionaries[locale as keyof typeof dictionaries]();
  }
  throw new Error(`No dictionary found for locale: ${locale}`);
};
