# Kévin Sauvage - Portfolio Website

A modern, multilingual portfolio website built with Next.js 14, showcasing my work as a Frontend Developer at Decathlon International.

## 🚀 Features

- **Multilingual Support**: Available in English, French, and Spanish
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, SASS
- **Performance Optimized**: Vercel Analytics, image optimization, lazy loading
- **Accessibility First**: WCAG compliant with proper semantic HTML
- **Security**: reCAPTCHA integration, security headers, form validation
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Structured data, meta tags, and sitemap generation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SASS
- **Icons**: Lucide React, DevIcons
- **Forms**: Zod validation with EmailJS integration
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Internationalized routes
│   ├── layout.tsx         # Root layout
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── _scopes/          # Feature-scoped components
│   │   ├── form/         # Contact form components
│   │   ├── notification/ # Notification system
│   │   └── section/      # Page sections
│   └── ...               # Shared components
├── config/               # Configuration files
├── dictionaries/         # i18n translations
├── hooks/               # Custom React hooks
├── actions/             # Server actions
└── styles/             # Global styles
```

## 🌐 Internationalization

The website supports three languages:

- **English** (default)
- **French**
- **Spanish**

Language detection is handled automatically based on browser preferences, with manual switching available.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Installation

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

Required environment variables:

- `email_js_service_id`: EmailJS service ID
- `email_js_public_key`: EmailJS public key
- `email_js_private_key`: EmailJS private key
- `email_js_template_id`: EmailJS template ID
- `RECAPTCHA_SECRET_KEY`: Google reCAPTCHA secret key

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run lint:css` - Run Stylelint
- `npm run lint:css:fix` - Fix Stylelint issues
- `npm run lint:ts` - Run TypeScript compiler check

## 🎨 Design System

The website uses a custom design system with:

- **Typography**: League Spartan (headings) + Josefin Sans (body)
- **Color Palette**: Dark theme with zinc and indigo accents
- **Animations**: Smooth transitions and hover effects
- **Grid System**: Responsive grid with auto-fit columns

## 🔧 Customization

### Adding New Projects

Edit `src/config/projects.config.tsx` to add new portfolio projects.

### Updating Content

Content is managed through dictionary files in `src/dictionaries/`:

- `en.json` - English content
- `fr.json` - French content
- `es.json` - Spanish content

### Styling

- Global styles: `src/styles/globals.scss`
- Component styles: Co-located with components
- Tailwind configuration: `tailwind.config.js`

## 🚀 Deployment

The website is deployed on Vercel with automatic deployments from the main branch.

### Build Optimization

- Image optimization with Next.js Image component
- Font optimization with Google Fonts
- Bundle analysis and code splitting
- Static generation for better performance

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Structured data and meta tags

## 🤝 Contributing

This is a personal portfolio website, but suggestions and improvements are welcome!

## 📄 License

This project is private and proprietary.

## 📞 Contact

- **Website**: [kevin-sauvage.com](https://www.kevin-sauvage.com)
- **LinkedIn**: [kevin-sauvage](https://www.linkedin.com/in/kevin-sauvage)
- **GitHub**: [kevinsauvage](https://github.com/kevinsauvage)

---

Built with ❤️ by Kévin Sauvage
