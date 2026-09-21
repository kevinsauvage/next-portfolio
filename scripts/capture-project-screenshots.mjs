/**
 * Capture project screenshots from a deployed demo into `public/`, so portfolio
 * images live in the repo and `next/image` optimises them — no Cloudinary upload.
 *
 * Usage:
 *   SCREENSHOT_BASE_URL=https://your-demo.vercel.app npm run screenshots
 *   npm run screenshots -- --base https://your-demo.vercel.app
 *
 * Env / flags:
 *   SCREENSHOT_BASE_URL / --base   Base URL of the deployed demo (required).
 *   SCREENSHOT_OUT_DIR  / --out    Output dir (default: public/images/projects/<slug>).
 *   SCREENSHOT_SLUG     / --slug   Project slug (default: modern-ecommerce-platform).
 *   --full                         Capture full-page instead of viewport.
 *
 * The demo is crawled for the first collection and product link, so slugs can
 * change over time without needing to edit this file.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const flag = name => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};

const SLUG = flag('--slug') ?? process.env.SCREENSHOT_SLUG ?? 'modern-ecommerce-platform';
const BASE_URL = (flag('--base') ?? process.env.SCREENSHOT_BASE_URL ?? '').replace(/\/$/, '');
const OUT_DIR = path.resolve(
  flag('--out') ?? process.env.SCREENSHOT_OUT_DIR ?? path.join('public', 'images', 'projects', SLUG)
);
const FULL_PAGE = args.includes('--full');
const VIEWPORT = { width: 1440, height: 900 };
const NAV_TIMEOUT = 60_000;

if (!BASE_URL) {
  console.error('Missing demo URL. Pass --base <url> or set SCREENSHOT_BASE_URL.');
  process.exit(1);
}

const run = async () => {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    colorScheme: 'dark',
    deviceScaleFactor: 1,
    viewport: VIEWPORT,
  });
  const page = await context.newPage();

  const dismissConsent = async () => {
    for (const name of [/accept all/i, /reject all/i, /^accept$/i, /got it/i]) {
      const button = page.getByRole('button', { name });
      if (await button.count()) {
        await button
          .first()
          .click()
          .catch(() => {});
        await page.waitForTimeout(500);
        return;
      }
    }
  };

  const capture = async (name, url) => {
    const response = await page
      .goto(url, { timeout: NAV_TIMEOUT, waitUntil: 'networkidle' })
      .catch(error => {
        console.warn(`  ! ${name}: ${error.message}`);
        return null;
      });

    if (response && response.status() >= 400) {
      console.warn(`  ! ${name}: skipped (HTTP ${response.status()})`);
      return;
    }

    // Let client-side data settle, then clear any consent overlay.
    await page.waitForTimeout(1200);
    await dismissConsent();
    await page.waitForTimeout(400);

    const file = path.join(OUT_DIR, `${name}.jpg`);
    await page.screenshot({
      animations: 'disabled',
      fullPage: FULL_PAGE,
      path: file,
      quality: 82,
      type: 'jpeg',
    });
    console.log(`  ✓ ${name} -> ${path.relative(process.cwd(), file)}`);
  };

  const firstHref = selector =>
    page
      .getAttribute(selector, 'href', { timeout: 5000 })
      .then(href => (href ? new URL(href, BASE_URL).href : null))
      .catch(() => null);

  console.log(`Capturing from ${BASE_URL}`);

  await capture('home', `${BASE_URL}/`);
  await capture('collections', `${BASE_URL}/collections`);

  const collectionHref = await firstHref('a[href^="/collections/"]:not([href*="/products/"])');
  if (collectionHref) await capture('collection', collectionHref);

  const productHref = await firstHref('a[href*="/collections/products/"]');
  if (productHref) await capture('product', productHref);

  await browser.close();
  console.log(`\nDone. Images written to ${path.relative(process.cwd(), OUT_DIR)}`);
};

run().catch(error => {
  console.error(error);
  process.exit(1);
});
