import { expect, test } from '@playwright/test';

const SLIDE = '[aria-roledescription="slide"]';
const LABEL = 'aria-label';
const NEXT = 'Next testimonial';

test.describe('testimonials carousel', () => {
  test('walks the slides with arrow keys from a control, including while animating', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject all' }).click();

    const carousel = page.getByRole('region', { name: 'Testimonials' });
    await carousel.scrollIntoViewIfNeeded();

    const slide = carousel.locator(SLIDE);
    await expect(slide).toHaveAttribute(LABEL, /^Testimonial 1 of \d+$/);

    // The region is intentionally not a tab stop: arrow keys are handled from
    // the controls inside it (keydown bubbles up to the region).
    expect(await carousel.getAttribute('tabindex')).toBeNull();

    const total = Number((await slide.getAttribute(LABEL))?.match(/of (\d+)/)?.[1]);
    expect(total).toBeGreaterThan(1);

    const nextButton = page.getByRole('button', { name: NEXT });
    await nextButton.focus();

    await page.keyboard.press('ArrowRight');
    await expect(slide).toHaveAttribute(LABEL, `Testimonial 2 of ${total}`);

    // The transition must not steal focus, otherwise the next press lands on
    // `<body>` and is never seen by the carousel.
    await expect(nextButton).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(slide).toHaveAttribute(LABEL, `Testimonial 3 of ${total}`);

    await page.keyboard.press('ArrowLeft');
    await expect(slide).toHaveAttribute(LABEL, `Testimonial 2 of ${total}`);
  });
});
