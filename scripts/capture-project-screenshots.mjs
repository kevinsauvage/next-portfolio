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
import { mkdir, rename, stat, unlink } from 'node:fs/promises';
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
const SETTLE_TIMEOUT = 10_000;
const RETRIES = 3;

if (!BASE_URL) {
  console.error('Missing demo URL. Pass --base <url> or set SCREENSHOT_BASE_URL.');
  process.exit(1);
}

const browserContext = browser =>
  browser.newContext({ colorScheme: 'dark', deviceScaleFactor: 1, viewport: VIEWPORT });

const run = async () => {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  const dismissConsent = async page => {
    const button = page.getByRole('button', {
      name: /accept all|reject all|^accept$|got it|i agree|agree/i,
    });

    for (let pass = 0; pass < 3; pass++) {
      if ((await button.count()) === 0) return;
      await button
        .first()
        .click({ timeout: 3000 })
        .catch(() => {});
      await page.waitForTimeout(500);
    }
  };

  const settle = async page => {
    // `networkidle` never settles on storefronts that keep connections open
    // (analytics, prefetch, polling), so treat it as a best-effort bonus.
    await page.waitForLoadState('networkidle', { timeout: SETTLE_TIMEOUT }).catch(() => {});
    await page.waitForTimeout(800);
    await dismissConsent(page);

    // Wait until every visible image has decoded, so we never capture a
    // half-painted page. Note: `every` on an empty list is already `true`,
    // which is exactly the settled state we want when there are no images.
    await page
      .waitForFunction(
        () => {
          const images = [...document.querySelectorAll('img')].filter(
            img => img.offsetParent !== null
          );
          return images.every(img => img.complete && img.naturalWidth > 0);
        },
        { timeout: SETTLE_TIMEOUT }
      )
      .catch(() => {});
    await page.waitForTimeout(400);
  };

  /**
   * Captures `url` to `<OUT_DIR>/<name>.jpg`. Each attempt uses its own
   * browser context so a page stuck mid-navigation can never poison the next
   * capture. The file is written atomically and verified afterwards, so a
   * logged success always means a real file on disk.
   */
  const capture = async (name, url) => {
    const file = path.join(OUT_DIR, `${name}.jpg`);
    const temp = `${file}.tmp`;

    for (let attempt = 1; attempt <= RETRIES; attempt++) {
      const context = await browserContext(browser);
      const page = await context.newPage();

      try {
        const response = await page.goto(url, {
          timeout: NAV_TIMEOUT,
          waitUntil: 'domcontentloaded',
        });
        const status = response?.status() ?? 0;
        if (status >= 400) throw new Error(`HTTP ${status}`);

        await settle(page);

        await page.screenshot({
          animations: 'disabled',
          fullPage: FULL_PAGE,
          path: temp,
          quality: 82,
          type: 'jpeg',
        });
        await rename(temp, file);

        const { size } = await stat(file);
        if (size === 0) throw new Error('wrote an empty file');

        console.log(
          `  ✓ ${name} -> ${path.relative(process.cwd(), file)} (${Math.round(size / 1024)} KB, HTTP ${status})`
        );
        return true;
      } catch (error) {
        console.warn(`  ! ${name}: attempt ${attempt}/${RETRIES} failed (${error.message})`);
        await unlink(temp).catch(() => {});
        await page.waitForTimeout(1000).catch(() => {});
      } finally {
        await context.close().catch(() => {});
      }
    }

    console.warn(`  ✗ ${name}: giving up after ${RETRIES} attempts`);
    return false;
  };

  /** Finds the first collection link, then the first product link inside it. */
  const discoverTargets = async () => {
    const context = await browserContext(browser);
    const page = await context.newPage();

    const href = selector =>
      page
        .getAttribute(selector, 'href', { timeout: 10_000 })
        .then(value => (value ? new URL(value, BASE_URL).href : null))
        .catch(() => null);

    try {
      await page.goto(`${BASE_URL}/collections`, {
        timeout: NAV_TIMEOUT,
        waitUntil: 'domcontentloaded',
      });
      await page.waitForLoadState('networkidle', { timeout: SETTLE_TIMEOUT }).catch(() => {});

      const collectionHref = await href('a[href^="/collections/"]:not([href*="/products/"])');
      if (!collectionHref) return { collectionHref: null, productHref: null };

      // A failure here only costs us the product shot — never the whole run.
      await page
        .goto(collectionHref, { timeout: NAV_TIMEOUT, waitUntil: 'domcontentloaded' })
        .catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: SETTLE_TIMEOUT }).catch(() => {});

      const productHref = await href('a[href*="/collections/products/"]');
      return { collectionHref, productHref };
    } catch (error) {
      console.warn(`  ! could not discover collection/product links (${error.message})`);
      return { collectionHref: null, productHref: null };
    } finally {
      await context.close().catch(() => {});
    }
  };

  console.log(`Capturing from ${BASE_URL}`);

  const { collectionHref, productHref } = await discoverTargets();

  const targets = [
    ['home', `${BASE_URL}/`],
    ['collections', `${BASE_URL}/collections`],
  ];

  if (collectionHref) targets.push(['collection', collectionHref]);
  else console.warn('  ! no collection link found on /collections');

  if (productHref) targets.push(['product', productHref]);
  else console.warn('  ! no product link found in the first collection');

  const results = [];
  for (const [name, url] of targets) {
    results.push([name, await capture(name, url)]);
  }

  await browser.close();

  const failed = results.filter(([, ok]) => !ok).map(([name]) => name);
  console.log(
    `\nDone. ${results.length - failed.length}/${results.length} images written to ${path.relative(process.cwd(), OUT_DIR)}`
  );

  if (failed.length > 0) {
    console.warn(`Failed: ${failed.join(', ')}`);
    process.exitCode = 1;
  }
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
