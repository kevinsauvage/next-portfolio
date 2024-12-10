import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: true,
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr'],
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
