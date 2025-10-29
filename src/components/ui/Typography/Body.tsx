import type { ElementType, ReactNode } from 'react';

import { colors, getTypographyClasses } from '@/design-system/tokens';

type BaseTypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

type TypographyProps = BaseTypographyProps & React.HTMLAttributes<HTMLElement>;

export const Body = ({ children, className, as: Component = 'p', ...props }: TypographyProps) => {
  const classes = getTypographyClasses('body');

  return (
    <Component className={(colors.text.secondary, className, classes)} {...props}>
      {children}
    </Component>
  );
};

export default Body;
