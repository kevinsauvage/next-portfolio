import type { ElementType, ReactNode } from 'react';

import { colors, getTypographyClasses } from '@/design-system/tokens';

import clsx from 'clsx';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  gradient?: boolean;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Display = ({
  children,
  className,
  as: Component = 'h1',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('display');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export const H1 = ({
  children,
  className,
  as: Component = 'h1',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h1');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export const H2 = ({
  children,
  className,
  as: Component = 'h2',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h2');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(className, classes, textColor)} {...props}>
      {children}
    </Component>
  );
};

export const H3 = ({
  children,
  className,
  as: Component = 'h3',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h3');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export const H4 = ({
  children,
  className,
  as: Component = 'h4',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h4');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export const H5 = ({
  children,
  className,
  as: Component = 'h5',
  gradient,
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('h5');
  const textColor = gradient ? colors.brand.gradientText : colors.text.primary;

  return (
    <Component className={clsx(classes, textColor, className)} {...props}>
      {children}
    </Component>
  );
};

export const BodyLarge = ({
  children,
  className,
  as: Component = 'p',
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('bodyLarge');

  return (
    <Component className={clsx(classes, colors.text.secondary, className)} {...props}>
      {children}
    </Component>
  );
};

export const Body = ({ children, className, as: Component = 'p', ...props }: TypographyProps) => {
  const classes = getTypographyClasses('body');

  return (
    <Component className={(colors.text.secondary, className, classes)} {...props}>
      {children}
    </Component>
  );
};

export const BodySmall = ({
  children,
  className,
  as: Component = 'p',
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('bodySmall');

  return (
    <Component className={clsx(classes, colors.text.secondary, className)} {...props}>
      {children}
    </Component>
  );
};

export const Caption = ({
  children,
  className,
  as: Component = 'span',
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('caption');

  return (
    <Component className={clsx(classes, colors.text.tertiary, className)} {...props}>
      {children}
    </Component>
  );
};

export const Overline = ({
  children,
  className,
  as: Component = 'p',
  ...props
}: TypographyProps) => {
  const classes = getTypographyClasses('overline');

  return (
    <Component className={clsx(classes, 'text-primary-400 uppercase', className)} {...props}>
      {children}
    </Component>
  );
};
