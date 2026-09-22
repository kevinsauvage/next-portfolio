import { expect, test } from '@playwright/test';

test.describe('project case study', () => {
  test('renders the case study with structured data and a way back', async ({ page }) => {
    await page.goto('/projects/modern-ecommerce-platform');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Modern E-Commerce Platform' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /back to portfolio/i }).first()).toBeVisible();

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();
  });

  test('returns 404 for an unknown project slug', async ({ page }) => {
    const response = await page.goto('/projects/does-not-exist');

    expect(response?.status()).toBe(404);
  });
});
