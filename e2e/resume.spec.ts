import { expect, test } from './fixtures';

test.describe('resume link', () => {
  test('does not prefetch the PDF as an RSC route', async ({ page }) => {
    const pdfRequests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('kevin_sauvage_resume.pdf')) {
        pdfRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The PDF lives in `/public`, so it has no RSC route. Prefetching it as a
    // route fires `GET .../kevin_sauvage_resume.pdf?_rsc=...` and 404s; the
    // links set `prefetch={false}`, so nothing should be requested until the
    // user clicks. Only visible in a production build (dev does not prefetch).
    expect(pdfRequests).toEqual([]);
  });
});
