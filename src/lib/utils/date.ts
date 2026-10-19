const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;

/**
 * Turns a display label (`'September 2025'`, `'2026'`) into a valid
 * `<time dateTime>` value (`'2025-09'`, `'2026'`), or `undefined` when the
 * label is not a recognised date.
 */
export const toDateTime = (label: string): string | undefined => {
  const trimmed = label.trim();
  if (/^\d{4}$/.test(trimmed)) return trimmed;

  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(trimmed);
  if (!match) return undefined;

  const month = MONTHS.indexOf(match[1]?.toLowerCase() as (typeof MONTHS)[number]);
  return month === -1 ? undefined : `${match[2]}-${String(month + 1).padStart(2, '0')}`;
};
