import { expect, test } from './fixtures';

test.describe('Site map', () => {
  test('the footer links the site map', async ({ page }) => {
    await page.goto('/');
    const legal = page.getByRole('navigation', { name: 'Legal' });

    await expect(legal.getByRole('link', { name: 'Site map' })).toHaveAttribute(
      'href',
      '/site-map'
    );
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
