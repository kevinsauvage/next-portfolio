'use client';

import { useCallback, useState } from 'react';

import Button from '@/components/ui/Button/Button';
import { BodySmall, H4 } from '@/components/ui/Typography';
import { type CookieCategoryName, cookies as copy } from '@/config/content';
import {
  consentFromFormData,
  type ConsentSettings,
  DENIED_CONSENT,
  dispatchConsentUpdated,
  GRANTED_CONSENT,
  readStoredConsent,
  writeStoredConsent,
} from '@/lib/consent';

import clsx from 'clsx';
import { X } from 'lucide-react';

/**
 * Pre-ticked boxes are not valid consent, so an optional category starts
 * unticked unless the visitor already chose it.
 */
const isCategoryChecked = (
  stored: ConsentSettings | null,
  name: CookieCategoryName,
  required: boolean | undefined
): boolean => {
  // eslint-disable-next-line security/detect-object-injection -- keyed by the static category list
  return Boolean(required) || stored?.[name] === true;
};

type Properties = {
  openSettings?: boolean;
};

/**
 * Client-only (`ssr: false` through `CookieBannerLoader`). Shows the summary
 * first and expands in place to the category form — no modal, so focus
 * management stays with the page and the banner keeps working without JS-heavy
 * dialog APIs. Saving writes the cookie and lets the listeners react.
 */
const CookieBanner = ({ openSettings = false }: Properties) => {
  // Reopened from the footer, only the preferences panel shows.
  const [showBanner, setShowBanner] = useState(!openSettings);
  const [showPreferences, setShowPreferences] = useState(openSettings);
  // Current choice, so a reopened panel shows what was agreed to.
  const [stored] = useState(readStoredConsent);

  const save = useCallback((settings: ConsentSettings) => {
    writeStoredConsent(settings);
    setShowBanner(false);
    setShowPreferences(false);
    dispatchConsentUpdated();
  }, []);

  const acceptAll = useCallback(() => save(GRANTED_CONSENT), [save]);
  const rejectAll = useCallback(() => save(DENIED_CONSENT), [save]);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    // Never leave a visitor with neither banner nor panel.
    if (readStoredConsent() === null) setShowBanner(true);
  }, []);

  const handleSave = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      save(consentFromFormData(new FormData(event.currentTarget)));
    },
    [save]
  );

  if (!showBanner && !showPreferences) return null;

  return (
    <section
      className='fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm'
      aria-labelledby={showPreferences ? 'cookie-preferences-title' : 'cookie-banner-title'}
    >
      <div className='container m-auto px-6 py-5'>
        {showPreferences ? (
          <form onSubmit={handleSave}>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <H4 id='cookie-preferences-title'>{copy.preferences.title}</H4>
                <BodySmall className='max-w-2xl mt-1 text-zinc-400'>
                  {copy.preferences.description}
                </BodySmall>
              </div>
              <button
                type='button'
                onClick={closePreferences}
                aria-label='Close cookie preferences'
                className='p-2 -m-2 rounded-md text-zinc-400 transition-colors hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary-300'
              >
                <X size={20} aria-hidden='true' />
              </button>
            </div>

            <div className='mt-4 grid gap-3 sm:grid-cols-2'>
              {copy.preferences.categories.map(({ name, title, description, required }) => (
                <div
                  key={name}
                  className={clsx(
                    'flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors',
                    required
                      ? 'cursor-not-allowed opacity-70'
                      : 'cursor-pointer hover:border-zinc-700'
                  )}
                >
                  <input
                    id={`cookie-${name}`}
                    type='checkbox'
                    name={name}
                    defaultChecked={isCategoryChecked(stored, name, required)}
                    disabled={required}
                    aria-describedby={`cookie-${name}-description`}
                    className='mt-1 size-4 shrink-0 accent-primary-500'
                  />
                  <div className='flex-1'>
                    {/* The title is the control's accessible name, so it has to
                        be the <label> itself; the explanation is a description. */}
                    <label
                      htmlFor={`cookie-${name}`}
                      className={clsx(
                        'block text-sm font-medium text-zinc-100',
                        required ? 'cursor-not-allowed' : 'cursor-pointer'
                      )}
                    >
                      {title}
                      {required ? (
                        <span className='ml-2 text-xs text-zinc-500'>
                          {copy.preferences.required}
                        </span>
                      ) : null}
                    </label>
                    <BodySmall id={`cookie-${name}-description`} className='text-sm text-zinc-400'>
                      {description}
                    </BodySmall>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 flex justify-end'>
              <Button type='submit' label={copy.preferences.save} size='sm' />
            </div>
          </form>
        ) : (
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <H4 id='cookie-banner-title'>{copy.banner.title}</H4>
              <BodySmall className='max-w-2xl mt-1 text-zinc-400'>
                {copy.banner.description}
              </BodySmall>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <Button
                type='button'
                variant='secondary'
                size='sm'
                label={copy.banner.rejectAll}
                onClick={rejectAll}
              />
              <Button
                type='button'
                variant='primary'
                size='sm'
                label={copy.banner.acceptAll}
                onClick={acceptAll}
              />
              <button
                type='button'
                onClick={() => setShowPreferences(true)}
                className='px-2 py-2 text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-100 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-md'
              >
                {copy.banner.customize}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CookieBanner;
