/**
 * Analytics identifier formats, shared by the runtime env validation
 * (`src/lib/env.ts`) and the client-side normalisers (`src/lib/analytics.ts`),
 * so the accepted shape can never drift between the two.
 */
export const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
export const GA4_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;
