# Next.js Portfolio

A modern, accessible portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features a clean design, smooth animations, and comprehensive developer experience tooling.

## Overview

This portfolio showcases professional work, skills, and experience through a responsive single-page application. Built with performance and accessibility in mind, it includes contact forms, project showcases, and a modern tech stack.

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessibility** - WCAG 2.1 compliant with proper heading hierarchy
- **Performance** - Optimized images, lazy loading, and Core Web Vitals
- **Contact Form** - EmailJS integration with reCAPTCHA protection
- **Animations** - Smooth transitions and micro-interactions
- **SEO Ready** - Meta tags, sitemap, and robots.txt
- **Type Safety** - Full TypeScript implementation
- **Testing** - Vitest setup with React Testing Library
- **Code Quality** - ESLint, Prettier, and Stylelint configuration

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with SCSS
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Email**: EmailJS
- **Analytics**: Vercel Analytics
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier + Stylelint

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kevinsauvage/next-portfolio.git
cd next-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
```

## Development

This is a private portfolio project. For development purposes:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Code quality
npm run check
npm run check:fix

# Testing
npm run test
```

## Configuration

### Content Management

Update content in the `src/config/content/` directory:

- `sections.ts` - Page section titles and descriptions
- `jobs.ts` - Professional experience
- `certifications.ts` - Education and certifications
- `projects.ts` - Portfolio projects
- `testimonials.ts` - Client testimonials
- `passions.ts` - Personal values and approach

### Styling

- Design tokens: `src/design-system/tokens.ts`
- Global styles: `src/styles/globals.scss`
- Tailwind config: `tailwind.config.js`

### Email Configuration

### Security: Content Security Policy (CSP)

This project sets a strict CSP via `next.config.mjs` headers. Key directives:

- **default-src**: 'self'
- **script-src**: 'self' plus Umami and Google (reCAPTCHA)
  - Allowed: `https://cloud.umami.is`, `https://www.google.com`, `https://www.gstatic.com`
  - Includes `'unsafe-inline'` to permit inline JSON-LD scripts used in `src/components/shared/StructuredData/StructuredData.tsx`. For a stricter policy, replace with nonces or hashes and pass a nonce to inline scripts.
- **style-src**: 'self' and `'unsafe-inline'` plus `https://fonts.googleapis.com` (if Google Fonts stylesheet is used)
- **font-src**: 'self', `https://fonts.gstatic.com`, and `data:` URIs
- **connect-src**: 'self', Umami, and Google
- **img-src**: 'self', `data:`, `blob:`, and `https:`
- **frame-src**: `https://www.google.com` (reCAPTCHA)
- **object-src**: 'none'; **base-uri**: 'self'; **form-action**: 'self'; `upgrade-insecure-requests`

Notes and exceptions:

- **Umami**: Loaded through a local rewrite to `/growth/...` that targets `https://cloud.umami.is/script.js`; `script-src`/`connect-src` allow the upstream host.
- **Structured Data (JSON-LD)**: Inline `<script type="application/ld+json">` requires `'unsafe-inline'`. To remove this, switch to a CSP nonce approach and set the nonce on those scripts.
- **reCAPTCHA v3**: Requires `www.google.com` and `www.gstatic.com` in `script-src`, `connect-src`, and `frame-src`.
- **Vercel Analytics**: If enabled, you may need to add Vercel domains (e.g., `https://va.vercel-scripts.com` in `script-src` and `https://vitals.vercel-insights.com` in `connect-src`).

1. Set up EmailJS account
2. Create email template
3. Add service credentials to environment variables
4. Configure reCAPTCHA for spam protection

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── shared/            # Reusable components
│   └── ui/                # Base UI components
├── config/
│   └── content/           # Content configuration
├── design-system/         # Design tokens and utilities
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── styles/                # Global styles
```

## About This Project

This is a personal portfolio website showcasing frontend development skills and professional experience. The codebase demonstrates modern web development practices including:

- Component-based architecture with React and Next.js
- TypeScript for type safety
- Tailwind CSS for styling
- Accessibility best practices
- Performance optimization
- Modern development tooling

## License

This project is proprietary and confidential. All rights reserved. See the [LICENSE](LICENSE) file for details.

## Contact

**Kévin Sauvage** - Frontend Developer

- Portfolio: [kevin-sauvage.com](https://www.kevin-sauvage.com/)
- LinkedIn: [linkedin.com/in/kevin-sauvage](https://www.linkedin.com/in/kevin-sauvage/)
- Email: [contact@kevin-sauvage.com](mailto:contact@kevin-sauvage.com)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
