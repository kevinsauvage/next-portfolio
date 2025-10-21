type VisuallyHiddenProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement>;

/**
 * VisuallyHidden component hides content visually but keeps it accessible to screen readers
 * Useful for providing additional context to assistive technologies
 */
const VisuallyHidden = ({ children, as: Component = 'span', ...props }: VisuallyHiddenProps) => {
  const Element = Component as keyof JSX.IntrinsicElements;

  return (
    // @ts-expect-error - Dynamic element type
    <Element
      className='absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0'
      style={{ clip: 'rect(0, 0, 0, 0)' }}
      {...props}
    >
      {children}
    </Element>
  );
};

export default VisuallyHidden;
