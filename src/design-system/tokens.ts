/**
 * Design Tokens System
 * Central source of truth for all design values
 * These tokens ensure consistency across the entire application
 */

// ============================================================================
// SPACING SYSTEM - Based on 4px grid
// ============================================================================
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
  40: '10rem', // 160px
} as const;

// Section spacing - consistent vertical rhythm
export const sectionSpacing = {
  sm: 'py-16 md:py-24', // Small sections
  md: 'py-20 md:py-32', // Medium sections (default)
  lg: 'py-24 md:py-40', // Large sections
  xl: 'py-32 md:py-48', // Extra large sections
} as const;

// Container spacing
export const containerSpacing = {
  padding: 'px-6',
  maxWidth: 'max-w-5xl',
  margin: 'm-auto',
} as const;

// Gap spacing for flex and grid
export const gapSpacing = {
  xs: 'gap-2', // 8px
  sm: 'gap-4', // 16px
  md: 'gap-6', // 24px
  lg: 'gap-8', // 32px
  xl: 'gap-12', // 48px
} as const;

// Stack spacing (vertical)
export const stackSpacing = {
  xs: 'space-y-4', // 16px
  sm: 'space-y-6', // 24px
  md: 'space-y-8', // 32px
  lg: 'space-y-12', // 48px
  xl: 'space-y-16', // 64px
  '2xl': 'space-y-24', // 96px
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================
export const typography = {
  // Display - For hero sections and major headlines
  display: {
    fontSize: 'text-5xl md:text-7xl',
    lineHeight: 'leading-tight',
    fontWeight: 'font-bold',
    fontFamily: 'font-heading',
  },

  // H1 - Primary page headings
  h1: {
    fontSize: 'text-4xl md:text-6xl',
    lineHeight: 'leading-tight',
    fontWeight: 'font-bold',
    fontFamily: 'font-heading',
  },

  // H2 - Section headings
  h2: {
    fontSize: 'text-3xl md:text-5xl',
    lineHeight: 'leading-snug',
    fontWeight: 'font-bold',
    fontFamily: 'font-heading',
  },

  // H3 - Subsection headings
  h3: {
    fontSize: 'text-2xl md:text-3xl',
    lineHeight: 'leading-snug',
    fontWeight: 'font-semibold',
    fontFamily: 'font-heading',
  },

  // H4 - Card titles
  h4: {
    fontSize: 'text-xl md:text-2xl',
    lineHeight: 'leading-normal',
    fontWeight: 'font-semibold',
    fontFamily: 'font-heading',
  },

  // H5 - Small headings
  h5: {
    fontSize: 'text-lg md:text-xl',
    lineHeight: 'leading-normal',
    fontWeight: 'font-semibold',
    fontFamily: 'font-heading',
  },

  // Body Large - Lead paragraphs
  bodyLarge: {
    fontSize: 'text-xl md:text-2xl',
    lineHeight: 'leading-relaxed',
    fontWeight: 'font-light',
  },

  // Body Regular - Standard body text
  body: {
    fontSize: 'text-base md:text-lg',
    lineHeight: 'leading-relaxed',
    fontWeight: 'font-light',
  },

  // Body Small - Secondary text
  bodySmall: {
    fontSize: 'text-sm md:text-base',
    lineHeight: 'leading-normal',
    fontWeight: 'font-normal',
  },

  // Caption - Labels and metadata
  caption: {
    fontSize: 'text-sm',
    lineHeight: 'leading-normal',
    fontWeight: 'font-medium',
  },

  // Overline - Section labels
  overline: {
    fontSize: 'text-sm',
    lineHeight: 'leading-normal',
    fontWeight: 'font-medium',
    letterSpacing: 'tracking-wider',
    textTransform: 'uppercase',
  },
} as const;

// ============================================================================
// COLOR SYSTEM - Enhanced for WCAG AA compliance
// ============================================================================
export const colors = {
  // Text colors - WCAG AA compliant
  text: {
    primary: 'text-zinc-50', // Main text - highest contrast
    secondary: 'text-zinc-200', // Secondary text - AA compliant
    tertiary: 'text-zinc-300', // Tertiary text - use sparingly
    muted: 'text-zinc-400', // Muted text - decorative only
    inverse: 'text-zinc-950', // Inverse text
  },

  // Background colors
  background: {
    primary: 'bg-zinc-950', // Main background
    secondary: 'bg-zinc-900', // Card backgrounds
    tertiary: 'bg-zinc-800', // Elevated surfaces
  },

  // Brand colors
  brand: {
    gradient: 'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500',
    gradientText:
      'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text',
  },

  // Status colors
  status: {
    success: 'text-green-400',
    error: 'text-rose-400',
    warning: 'text-amber-400',
    info: 'text-blue-400',
  },

  // Border colors
  border: {
    default: 'border-zinc-700',
    subtle: 'border-zinc-800',
    emphasis: 'border-zinc-600',
  },
} as const;

// ============================================================================
// BORDER RADIUS SYSTEM
// ============================================================================
export const radius = {
  none: 'rounded-none',
  sm: 'rounded-md', // 6px - Small cards, inputs
  md: 'rounded-lg', // 8px - Buttons, main cards
  lg: 'rounded-xl', // 12px - Featured elements
  full: 'rounded-full', // Pills, badges, avatars
} as const;

// ============================================================================
// ICON SIZES
// ============================================================================
export const iconSizes = {
  xs: 14, // Small decorative icons
  sm: 16, // Inline icons
  md: 20, // Default icons
  lg: 24, // Navigation icons
  xl: 28, // Large feature icons
} as const;

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================
export const animations = {
  // Transition durations
  duration: {
    fast: 'duration-200',
    normal: 'duration-300',
    slow: 'duration-500',
  },

  // Transition timing
  timing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },

  // Stagger delays for sequential animations
  stagger: {
    base: 100, // Base delay in ms
    increment: 100, // Increment per item
    max: 800, // Maximum delay
  },

  // Initial load animation delays
  loadDelay: {
    first: '0.2s',
    second: '0.4s',
    third: '0.6s',
    fourth: '0.8s',
  },
} as const;

// ============================================================================
// CARD/COMPONENT SYSTEM
// ============================================================================
export const card = {
  // Card padding
  padding: {
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7 md:p-8',
    lg: 'p-8 sm:p-10 md:p-12',
  },

  // Card hover effects
  hover: {
    // Subtle lift for small cards
    subtle: 'hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300',
    // Standard lift for medium cards
    standard: 'hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300',
    // Pronounced lift for large/featured cards
    pronounced: 'hover:-translate-y-3 hover:scale-[1.03] transition-all duration-300',
  },

  // Shadow effects
  shadow: {
    default: 'shadow-lg',
    hover: 'hover:shadow-2xl',
    glow: 'shadow-glow-md hover:shadow-glow-lg',
  },
} as const;

// ============================================================================
// LAYOUT BREAKPOINTS (for reference in JSX)
// ============================================================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate stagger delay for sequential animations
 * @param index - Item index in the list
 * @param base - Base delay in ms (default: 100)
 * @param increment - Increment per item (default: 100)
 * @param max - Maximum delay (default: 800)
 */
export function getStaggerDelay(
  index: number,
  base: number = animations.stagger.base,
  increment: number = animations.stagger.increment,
  max: number = animations.stagger.max
): string {
  const delay = Math.min(base + index * increment, max);
  return `${delay}ms`;
}

/**
 * Combine typography styles into a single className string
 */
export function getTypographyClasses(variant: keyof typeof typography): string {
  const styles = typography[variant];
  return Object.values(styles).join(' ');
}

