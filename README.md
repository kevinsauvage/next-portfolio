# Next.js Portfolio

A modern, accessible portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean design, smooth animations, and comprehensive developer experience tooling.

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

- **Framework**: Next.js 15 with App Router
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

- Portfolio: [your-portfolio-url.com](https://www.kevin-sauvage.com/)
- LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/kevin-sauvage/)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
