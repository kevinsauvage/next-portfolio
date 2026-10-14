type ButtonContentProps = {
  label: string;
  svg?: React.ReactNode;
};

/** Label + icon layout shared by `Button` and `ButtonLink`. */
const ButtonContent = ({ label, svg }: ButtonContentProps) => (
  <span className='w-full flex items-center justify-center gap-2 relative z-10'>
    {label}
    <span className='transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-6'>
      {svg}
    </span>
  </span>
);

export default ButtonContent;
