/** The four banner categories, in display order; the first can never be refused. */
export type CookieCategoryName =
  'functionality_storage' | 'analytics_storage' | 'personalization_storage' | 'ad_storage';

export type CookieCategory = {
  name: CookieCategoryName;
  title: string;
  description: string;
  required?: boolean;
};

export const cookies: {
  banner: {
    title: string;
    description: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
  };
  preferences: {
    title: string;
    description: string;
    save: string;
    required: string;
    categories: CookieCategory[];
  };
  settingsTrigger: string;
} = {
  banner: {
    title: 'Analytics cookies',
    description:
      'I use analytics cookies to see which parts of this portfolio get read. Nothing is tracked until you accept, and you can change your mind whenever you like.',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Customize',
  },
  preferences: {
    title: 'Cookie preferences',
    description:
      'Choose the categories you allow. Strictly necessary storage keeps your choice and is always on.',
    save: 'Save preferences',
    required: 'Always on',
    categories: [
      {
        name: 'functionality_storage',
        title: 'Strictly necessary',
        description: 'Remembers your cookie choice so the banner does not ask again.',
        required: true,
      },
      {
        name: 'analytics_storage',
        title: 'Analytics',
        description: 'Anonymous statistics about pages viewed, so I know what is useful.',
      },
      {
        name: 'personalization_storage',
        title: 'Personalization',
        description: 'Remembers display preferences such as the colour theme.',
      },
      {
        name: 'ad_storage',
        title: 'Advertising',
        description: 'Measures campaigns. Off unless you turn it on.',
      },
    ],
  },
  settingsTrigger: 'Cookie settings',
};
