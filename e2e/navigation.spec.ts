import { expect, test } from '@playwright/test';

test.describe('header navigation', () => {
  test('exposes primary section links and navigates to a section', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: /go to portfolio section/i })).toBeVisible();

    await nav.getByRole('link', { name: /go to about section/i }).click();
    await expect(page).toHaveURL(/#about$/);
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
          const container = document.querySelector('[role="dialog"]');
          return !!container && container.contains(document.activeElement);
        })
      )
      .toBe(true);

    for (let step = 0; step < 8; step += 1) {
      await page.keyboard.press('Tab');
      const focusInside = await page.evaluate(() => {
        const container = document.querySelector('[role="dialog"]');
        return !!container && container.contains(document.activeElement);
      });
      expect(focusInside).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});
