import { expect, test as base } from '@playwright/test';

/**
 * Base test for this suite. Aborts Google's reCAPTCHA requests in every spec.
 *
 * The contact section mounts the reCAPTCHA provider once it scrolls into view,
 * which pulls Google's script into any spec that reaches it — and the dummy site
 * key makes that script throw an uncaught "Missing required parameters: sitekey"
 * into the console. Only `contact.spec.ts` exercises the captcha, and it stubs
 * `window.grecaptcha` and pre-registers the script tag itself, so it never loads
 * the real script. Blocking it everywhere else keeps runs hermetic.
 */
export const test = base.extend<{ blockedRecaptcha: void }>({
  blockedRecaptcha: [
    async ({ page }, use) => {
      await page.route(/google\.com\/recaptcha|gstatic\.com\/recaptcha/, route => route.abort());
      await use();
    },
    { auto: true },
  ],
});

export { expect };
