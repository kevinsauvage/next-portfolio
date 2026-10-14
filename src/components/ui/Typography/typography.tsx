import type { ElementType, ReactNode } from 'react';

import clsx from 'clsx';

export type TypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & React.HTMLAttributes<HTMLElement>;

export type HeadingProps = TypographyProps & { gradient?: boolean };

export const GRADIENT_TEXT =
  'bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 text-transparent bg-clip-text';

/** Heading colour: gradient text when requested, solid zinc otherwise. */
export const headingColor = (gradient?: boolean): string =>
  gradient ? GRADIENT_TEXT : 'text-zinc-50';

/** Builds a text component with fixed default tag and classes; `className` always wins. */
export const createText = (tag: ElementType, classes: string) => {
  const Text = ({ children, className, as: Component = tag, ...props }: TypographyProps) => (
    <Component className={clsx(classes, className)} {...props}>
      {children}
    </Component>
  );
  return Text;
};

/** Same, for headings that support the `gradient` prop. */
export const createHeading = (tag: ElementType, classes: string) => {
  const Heading = ({
    children,
    className,
    as: Component = tag,
    gradient,
    ...props
  }: HeadingProps) => (
    <Component className={clsx(classes, headingColor(gradient), className)} {...props}>
      {children}
    </Component>
  );
  return Heading;
};
