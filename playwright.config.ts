import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env['PORT'] ?? 3001);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  forbidOnly: !!process.env['CI'],
  fullyParallel: true,
  // The dev server (Turbopack) compiles routes on demand; more than 2
  // concurrent browser contexts starve it and `page.goto` hits the default
  // 30s `load` timeout. Cap workers so `npm run test:e2e` stays reliable.
  workers: 2,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : 'list',
  retries: process.env['CI'] ? 2 : 0,
  testDir: './e2e',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    env: {
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: 'playwright-test-site-key',
    },
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
    url: baseURL,
  },
});
