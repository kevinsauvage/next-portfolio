'use client';

import { cookies as copy } from '@/config/content/cookies';
import { openConsentSettings } from '@/lib/consent';

/** Lets the visitor change their mind after the banner is gone. */
const CookieSettingsButton = () => {
  return (
    <button
      type='button'
      onClick={openConsentSettings}
      className='text-zinc-300 underline-offset-4 transition-colors hover:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-md'
    >
      {copy.settingsTrigger}
    </button>
  );
};

export default CookieSettingsButton;
