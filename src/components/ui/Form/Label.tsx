import RequiredIndicator from './RequiredIndicator';

import clsx from 'clsx';

type Properties = {
  children: React.ReactNode;
  missing?: boolean;
  htmlFor?: string;
  className?: string;
  required?: boolean;
};

const Label = ({ children, className, missing, required, ...rest }: Properties) => (
  <label
    className={clsx(
      'text-lg text-zinc-300',
      missing ? 'flex flex-col w-full space-y-1' : 'flex',
      className
    )}
    {...rest}
  >
    {required ? (
      <span className='relative w-fit'>
        {children}
        <RequiredIndicator />
      </span>
    ) : (
      children
    )}
  </label>
);

export default Label;
