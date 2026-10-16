import { expect, test } from '@playwright/test';

test.describe('RGAA legal pages', () => {
  test('the footer shows the compliance status and links the statement and site map', async ({
    page,
  }) => {
    await page.goto('/');
    const legal = page.getByRole('navigation', { name: 'Legal' });

    await expect(legal.getByRole('link', { name: /^Accessibility: / })).toHaveAttribute(
      'href',
      '/accessibility'
    );
    await expect(legal.getByRole('link', { name: 'Site map' })).toHaveAttribute(
      'href',
      '/site-map'
    );
  });

  test('renders the accessibility statement', async ({ page }) => {
    const response = await page.goto('/accessibility');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/^Accessibility statement \| /);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Accessibility statement' })
    ).toBeVisible();
  });

  test('navigates from the site map to a project case study', async ({ page }) => {
    await page.goto('/site-map');
    await expect(page).toHaveTitle(/^Site map \| /);

    await page
      .getByRole('navigation', { name: 'Site map' })
      .getByRole('link', { name: 'ComplyLoop' })
      .click();
    await expect(page).toHaveURL(/\/projects\/complyloop$/);
  });
});
