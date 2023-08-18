'use client';

import { motion } from 'framer-motion';

const Animation = ({ children, tag = 'div', ...rest }) => {
  const Tag = motion[tag];

  const spring = {
    damping: 10,
    stiffness: 100,
    type: 'spring',
  };

  return (
    <Tag transition={spring} {...rest}>
      {children}
    </Tag>
  );
};

export default Animation;
