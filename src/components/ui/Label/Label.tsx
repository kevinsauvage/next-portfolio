import { colors } from '@/design-system/tokens';

import clsx from 'clsx';

type Properties = { children: React.ReactNode; missing?: boolean };

const Label = ({ children, ...rest }: Properties) => (
  <label className={clsx('flex flex-col text-lg w-full space-y-1', colors.text.tertiary)} {...rest}>
    {children}
  </label>
);

export default Label;
