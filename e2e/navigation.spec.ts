import { expect, test } from '@playwright/test';

test.describe('header navigation', () => {
  test('exposes primary section links and navigates to a section', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Portfolio', exact: true })).toBeVisible();

    await nav.getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(/#about$/);
  });
});

test.describe('active section highlight', () => {
  test('does not freeze on the last section after visiting another page', async ({ page }) => {
    // Fresh context: the consent banner is up, so clear it before navigating.
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject all' }).click();

    const nav = page.getByRole('navigation', { name: 'Primary' });
    const currentLink = nav.locator('a[aria-current="true"]');
    const contactLink = nav.getByRole('link', { name: 'Contact', exact: true });

    // Reach the last section with an in-page hash navigation rather than a
    // `/#contact` deep link: Next.js seeds its route cache with the initial
    // URL's hash and restores it on later same-route navigations, which would
    // leave a stale `#contact` in the address bar after the logo click below.
    await contactLink.click();
    await expect(contactLink).toHaveAttribute('aria-current', 'true');

    // Client-side navigation away from the homepage sections…
    await page.locator('footer a[href="/privacy"]').first().click();
    await expect(page).toHaveURL(/\/privacy$/);

    // …nothing is active on a page without those sections…
    await expect(currentLink).toHaveCount(0);

    // …and back home the highlight follows the page again.
    await page.locator('header a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
    await expect(currentLink).toHaveCount(1);
    await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('traps focus inside the dialog and closes on Escape', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
    await expect(dialog).toBeVisible();

    // The focus trap moves focus into the dialog shortly after it opens.
    await expect
      .poll(() =>
        page.evaluate(() => {
          const container = document.querySelector('dialog');
          return !!container && container.contains(document.activeElement);
        })
      )
      .toBe(true);

    for (let step = 0; step < 8; step += 1) {
      await page.keyboard.press('Tab');
      const focusInside = await page.evaluate(() => {
        const container = document.querySelector('dialog');
        return !!container && container.contains(document.activeElement);
      });
      expect(focusInside).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});
