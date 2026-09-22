import { expect, test } from '@playwright/test';

interface GrecaptchaStub {
  ready: (callback: () => void) => void;
  execute: () => Promise<string>;
  render: () => number;
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaStub;
    __recaptchaReady?: boolean;
  }
}

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Deterministic reCAPTCHA: pre-register the script tag the provider looks
    // for so it never loads Google's script, and expose a stubbed grecaptcha.
    await page.addInitScript(() => {
      window.grecaptcha = {
        ready: callback => {
          window.__recaptchaReady = true;
          callback();
        },
        execute: () => Promise.resolve('e2e-captcha-token'),
        render: () => 0,
      };

      // The provider short-circuits loading Google's script when a script tag
      // with this id already exists. `document.head` may be unavailable when
      // the init script runs, so wait for the DOM before adding the marker.
      const addMarker = () => {
        if (document.querySelector('#google-recaptcha-v3')) return;
        const script = document.createElement('script');
        script.id = 'google-recaptcha-v3';
        (document.head ?? document.documentElement)?.appendChild(script);
      };

      if (document.head) {
        addMarker();
      } else {
        document.addEventListener('DOMContentLoaded', addMarker, { once: true });
      }
    });

    await page.goto('/');
  });

  test('renders an accessible contact form', async ({ page }) => {
    const form = page.getByRole('form', { name: /contact form/i });

    await expect(form).toBeVisible();
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /message/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('surfaces inline validation errors on empty submit', async ({ page }) => {
    // The provider lazy-mounts once the contact section scrolls into view.
    await page.getByRole('form', { name: /contact form/i }).scrollIntoViewIfNeeded();

    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText('Full name is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Email is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Message is required', { exact: true })).toBeVisible();
  });
});
