import { expect, test } from './fixtures';

import type { Page } from '@playwright/test';

const ACCEPT_ALL = { name: 'Accept all' };
const REJECT_ALL = { name: 'Reject all' };

/** Blocks Google's tag endpoints and records every attempt to reach them. */
const trackTagRequests = async (page: Page) => {
  const requests: string[] = [];
  await page.route(/googletagmanager\.com/, route => {
    requests.push(route.request().url());
    return route.abort();
  });
  return requests;
};

test.describe('cookie consent', () => {
  test('loads no Google tag before the visitor chooses', async ({ page }) => {
    const requests = await trackTagRequests(page);
    await page.goto('/');

    await expect(page.getByRole('button', ACCEPT_ALL)).toBeVisible();
    await page.waitForLoadState('load');

    expect(requests).toEqual([]);
    await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0);
  });

  test('keeps tags off after "Reject all", including on reload', async ({ page }) => {
    const requests = await trackTagRequests(page);
    await page.goto('/');

    await page.getByRole('button', REJECT_ALL).click();
    await expect(page.getByRole('button', ACCEPT_ALL)).toBeHidden();

    await page.reload();
    await page.waitForLoadState('load');

    await expect(page.getByRole('button', ACCEPT_ALL)).toBeHidden();
    expect(requests).toEqual([]);
  });

  test('loads the Google tag once the visitor accepts', async ({ page }) => {
    const requests = await trackTagRequests(page);
    await page.goto('/');

    await page.getByRole('button', ACCEPT_ALL).click();

    await expect.poll(() => requests.length, { timeout: 15_000 }).toBeGreaterThan(0);
  });

  test('reopens the preferences from the footer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', REJECT_ALL).click();

    await page.getByRole('button', { name: 'Cookie settings' }).click();

    await expect(page.getByRole('button', { name: 'Close cookie preferences' })).toBeVisible();
  });
});
