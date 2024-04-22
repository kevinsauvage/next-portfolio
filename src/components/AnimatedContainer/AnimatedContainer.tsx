'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

type AnimatedContainerProperties = {
  children: React.ReactNode;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
} & React.HTMLAttributes<HTMLDivElement>;

const AnimatedContainer: React.FC<AnimatedContainerProperties> = ({
  children,
  from,
  to,
  ...rest
}) => {
  const reference = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(reference.current, from, to);
  }, [from, to]);

  return (
    <div ref={reference} {...rest}>
      {children}
    </div>
  );
};

export default AnimatedContainer;
