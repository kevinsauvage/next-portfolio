# TODO — Production readiness

Open work from the codebase review. Keep the existing consent and CSP decisions intact unless a separately reviewed change updates them.

## Reliability and privacy

- [ ] **Make rate-limit fallback policy explicit and observable.** `checkRateLimit()` silently switches from shared Upstash counters to per-process memory when Redis fails. Define the production fail-open/fail-closed policy for contact submissions, report Redis fallback with a structured signal, and test the chosen behavior under timeout and malformed responses.
- [ ] **Redact exceptions before production logging.** `logError()` avoids forwarding raw messages to analytics, but it still logs the original message and sends the exception to Sentry. Review provider and request errors for possible addresses, message content, tokens, or raw payloads; scrub sensitive fields before console/Sentry capture and add redaction coverage.
- [ ] **Give the global error boundary a recovery path.** `src/app/global-error.tsx` reports to Sentry but renders Next's generic error page without a site-specific retry or reload action. Add a minimal accessible fallback with a recovery action and confirm it remains usable when the root layout fails.
- [ ] **Add a deployment check for contact-form configuration.** Required server environment variables are validated lazily when the form action reaches the mail workflow, so a deployment with missing EmailJS or reCAPTCHA secrets can serve pages and fail only on submission. Add a safe deployment/startup validation that reports missing variable names without exposing values or blocking static builds.

## Security hardening

- [ ] **Narrow the image CSP source list.** `img-src` currently allows every HTTPS host, while project imagery is served from the local `public/` tree. Inventory actual image origins and allow only those required; keep the change covered by CSP tests and preserve the documented static-rendering trade-off for scripts.
- [ ] **Verify request identity and CAPTCHA host trust.** The contact action uses forwarded headers for IP throttling and the request host for CAPTCHA hostname comparison. Document the trusted proxy contract, validate the production host against the deployed domain/aliases, and test missing, malformed, and spoofed header cases.
