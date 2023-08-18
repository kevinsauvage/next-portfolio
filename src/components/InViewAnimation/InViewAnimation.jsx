'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';

const InViewAnimation = ({ children, tag, hidden, visible, duration = 1, ...rest }) => {
  const Tag = motion[tag];

  const spring = {
    damping: 10,
    duration,
    stiffness: 100,
    type: 'spring',
  };

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={spring}
      variants={{ hidden, visible }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default InViewAnimation;
