import { expect, test } from './fixtures';

test.describe('privacy policy page', () => {
  test('is linked from the footer quick links', async ({ page }) => {
    await page.goto('/');

    const link = page
      .getByRole('navigation', { name: 'Footer navigation' })
      .getByRole('link', { name: 'Privacy' });

    await expect(link).toHaveAttribute('href', '/privacy');
  });

  test('renders the policy, its cookie table and the controller email', async ({ page }) => {
    const response = await page.goto('/privacy');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();
    await expect(
      page.getByRole('table', { name: 'Cookie and storage categories this site uses' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /kevinsauvage@outlook\.com/ }).first()
    ).toHaveAttribute('href', 'mailto:kevinsauvage@outlook.com');
  });

  test('jumps to a section from the table of contents', async ({ page }) => {
    await page.goto('/privacy');

    await page.getByRole('link', { name: 'Retention' }).click();

    await expect(page).toHaveURL(/#retention$/);
    await expect(
      page.getByRole('heading', { level: 2, name: '7. How long data is kept' })
    ).toBeVisible();
  });
});
