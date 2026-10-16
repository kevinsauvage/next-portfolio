import { expect, type Page, test } from '@playwright/test';
import type { AxeResults, default as Axe } from 'axe-core';

// RGAA 4.1 is built on WCAG 2.1 AA: run the automatable subset of those rules
// on every route against the real rendered page (colors, landmarks, names…).
const AXE_PATH = require.resolve('axe-core/axe.min.js');
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const ROUTES = [
  '/',
  '/privacy',
  '/accessibility',
  '/site-map',
  '/projects/complyloop',
  '/this-page-does-not-exist',
];

const runAxe = async (page: Page): Promise<AxeResults['violations']> => {
  await page.addScriptTag({ path: AXE_PATH });
  return page.evaluate(async tags => {
    const results = await window.axe.run(document, {
      runOnly: { type: 'tag', values: tags },
    });
    return results.violations;
  }, WCAG_AA_TAGS);
};

declare global {
  interface Window {
    axe: typeof Axe;
  }
}

// The strict nonce CSP would block the injected axe script.
test.use({ bypassCSP: true });

for (const route of ROUTES) {
  test(`${route} has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const violations = await runAxe(page);
    const summary = violations.map(({ id, help, nodes }) => ({
      id,
      help,
      targets: nodes.map(node => node.target.join(' ')),
    }));

    expect(summary).toEqual([]);
  });
}
