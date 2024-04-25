'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type AnimatedContainerProperties = {
  children: React.ReactNode;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  timelineOptions?: gsap.TimelineVars;
  Tag?: React.ElementType;
  triggerClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const AnimatedContainer: React.FC<AnimatedContainerProperties> = ({
  children,
  from,
  to,
  timelineOptions = {},
  triggerClassName,
  Tag = 'div',
  ...rest
}) => {
  const reference = useRef(null);

  useGSAP(() => {
    if (typeof timelineOptions.scrollTrigger === 'object') {
      timelineOptions.scrollTrigger = {
        ...timelineOptions.scrollTrigger,
        trigger: reference.current,
      };
    }
    const tl = gsap.timeline(timelineOptions);
    tl.fromTo(triggerClassName || reference.current, from, to);
  });

  return (
    <Tag ref={reference} {...rest}>
      {children}
    </Tag>
  );
};

export default AnimatedContainer;
