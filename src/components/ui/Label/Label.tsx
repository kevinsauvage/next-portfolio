type Properties = { children: React.ReactNode; missing?: boolean };

const Label = ({ children, ...rest }: Properties) => (
  <label className='flex flex-col text-lg text-zinc-300 w-full space-y-1' {...rest}>
    {children}
  </label>
);

export default Label;
