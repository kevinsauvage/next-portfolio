import clsx from 'clsx';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for sequential reveals. */
  delay?: number;
  /** Render as a different element (defaults to `div`). */
  as?: 'div' | 'section' | 'header' | 'p' | 'li' | 'span';
};

/**
 * Fades/slides content in the first time it enters the viewport.
 *
 * Deliberately a **server** component: it only emits markup with the `.reveal`
 * class, and a single client-side observer (`RevealObserver`) flips
 * `.is-visible`. When this was a client component, every subtree it wrapped was
 * serialised a second time into the RSC flight payload — on the home page that
 * was ~197 KB of the 388 KB document. It is also the reason `noscript` in the
 * root layout un-hides `.reveal`: without JS nothing would add `.is-visible`.
 */
const Reveal = ({ children, className, delay = 0, as: Component = 'div' }: RevealProps) => {
  return (
    <Component
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={clsx('reveal', className)}
    >
      {children}
    </Component>
  );
};

export default Reveal;
