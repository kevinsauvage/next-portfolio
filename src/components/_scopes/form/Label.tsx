type Properties = { children: React.ReactNode; missing?: boolean };

const Label = ({ children, ...rest }: Properties) => (
  <label className="flex flex-col text-base w-full" {...rest}>
    {children}
  </label>
);

export default Label;
