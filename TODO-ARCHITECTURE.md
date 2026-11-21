# TODO — Architecture

Open work from the codebase review. Prefer small boundaries that clarify responsibilities over new framework layers.

## Contact submission

- [ ] **Separate contact submission orchestration from the Server Action.** `src/actions/send-mail.ts` currently owns form parsing, request-header reads, IP and email throttling, CAPTCHA verification, EmailJS dispatch, logging, and UI-state mapping in one module. Keep the Server Action as a thin adapter and move the server-only submission workflow into a domain module with explicit inputs/results. Preserve validation order, rate-limit behavior, and the current UI messages.
- [ ] **Read trusted request context once.** `getClientKey()` and `getRequestHost()` each call `headers()` independently. Build a small request-context value once at the action boundary and pass only the needed fields to the contact workflow; verify proxy-header assumptions for Vercel in the same change.
