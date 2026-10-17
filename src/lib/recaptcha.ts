/**
 * Minimal reCAPTCHA v3 client.
 *
 * Deliberately free of `react-google-recaptcha-v3`: importing that library from
 * the form keeps it in every page's initial JS bundle, because the form renders
 * immediately while only its provider is deferred. The provider still injects
 * Google's script — this module only asks it for a token.
 */

/** The subset of `window.grecaptcha` this site uses. */
type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

/** Raised when Google's script has not (yet) exposed `grecaptcha`. */
export class RecaptchaUnavailableError extends Error {
  constructor() {
    super('reCAPTCHA is not available yet');
    this.name = 'RecaptchaUnavailableError';
  }
}

const readGrecaptcha = (): Grecaptcha | undefined =>
  (globalThis as { grecaptcha?: Grecaptcha }).grecaptcha;

/**
 * Resolves a reCAPTCHA v3 token for `action`.
 *
 * Rejects with {@link RecaptchaUnavailableError} when the script has not loaded:
 * the provider only mounts the script once the form nears the viewport, so this
 * is a "try again in a moment" case rather than a fatal one — which is exactly
 * what the `recaptchaUnavailable` copy says.
 */
export const getRecaptchaToken = (siteKey: string, action: string): Promise<string> => {
  const grecaptcha = readGrecaptcha();
  if (!grecaptcha) return Promise.reject(new RecaptchaUnavailableError());

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action }).then(resolve, reject);
    });
  });
};
