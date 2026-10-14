/**
 * Zero-pads a 1-based index for display (`1` → `"01"`), matching the numbered
 * badges, FAQ rows and carousel counters.
 */
export const padIndex = (value: number): string => String(value).padStart(2, '0');
