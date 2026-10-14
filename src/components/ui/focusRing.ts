/**
 * Shared focus-visible ring classes for icon-only controls.
 *
 * Full literal class strings (not templated) so Tailwind's scanner still emits
 * them. `FOCUS_RING` uses the primary hue, `FOCUS_RING_SECONDARY` the secondary.
 */
export const FOCUS_RING =
  'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-black';

export const FOCUS_RING_SECONDARY =
  'focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 focus:ring-offset-black';
