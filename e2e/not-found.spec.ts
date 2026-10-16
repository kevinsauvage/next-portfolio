import { expect, test } from '@playwright/test';

test.describe('404 page', () => {
  test('returns 404 for an unknown route and links back home', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);

    await expect(page.getByText('Oops! Page Not Found')).toBeVisible();

    await page.getByRole('link', { name: 'Go Back Home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('returns 404 for an unknown project slug', async ({ page }) => {
    const response = await page.goto('/projects/not-a-real-project');
    expect(response?.status()).toBe(404);
  });
});
