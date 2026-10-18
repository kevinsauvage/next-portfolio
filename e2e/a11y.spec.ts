import { expect, test } from './fixtures';

import type { Page } from '@playwright/test';
import type { AxeResults, default as Axe } from 'axe-core';

// RGAA 4.1 is built on WCAG 2.1 AA: run the automatable subset of those rules
// (plus WCAG 2.2 AA and axe best practices) on every route against the real
// rendered page (colors, landmarks, names…).
const AXE_PATH = require.resolve('axe-core/axe.min.js');
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const ROUTES = [
  '/',
  '/privacy',
  '/site-map',
  '/projects/complyloop',
  '/projects/modern-ecommerce-platform',
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
  test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
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

/**
 * Guards the "every field has a visible label" check on the contact form.
 *
 * Two things can hide the fields from a real browser while passing axe in jsdom
 * (which has no layout): a `next/dynamic` boundary streams the form into a
 * `<div hidden>`, and the scroll reveal leaves it at `opacity: 0` until the
 * section is scrolled to. Axe also cannot see either, and the audits above run
 * with reduced motion, which reveals everything immediately — so this runs
 * without emulation, before any scrolling, and asserts computed styles.
 */
test('contact form fields are visible and labelled before any scrolling', async ({ page }) => {
  await page.goto('/');

  for (const id of ['fullName', 'email', 'message']) {
    const labelText = (await page.locator(`label[for="${id}"]`).textContent())?.trim();
    const hidingAncestors = await page.evaluate((fieldId: string) => {
      const field = document.querySelector(`#${fieldId}`);
      if (!field) return ['field missing'];
      const problems: string[] = [];
      let node: Element | null = field;
      while (node) {
        const style = getComputedStyle(node);
        const hidden =
          node.hasAttribute('hidden') ||
          style.display === 'none' ||
          style.opacity === '0' ||
          style.visibility === 'hidden';
        if (hidden) {
          problems.push(
            `<${node.tagName.toLowerCase()} class="${(node.className || '').toString()}">`
          );
        }
        node = node.parentElement;
      }
      return problems;
    }, id);

    expect(labelText, `${id} must have a label with visible text`).toBeTruthy();
    expect(hidingAncestors, `${id} must be visible at load`).toEqual([]);
  }
});

// WCAG 1.4.10 (RGAA 10.11): content reflows at 320 CSS px, and any region that
// still scrolls sideways (the cookie table) stays reachable from the keyboard.
test('/privacy reflows at 320px without violations', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/privacy');
  await page.waitForLoadState('networkidle');

  const overflowsPage = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflowsPage).toBe(false);
  expect(await runAxe(page)).toEqual([]);
});
