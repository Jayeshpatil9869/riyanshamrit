import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface FramerRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scale?: number;
  className?: string;
  blur?: boolean;
}

export const FramerReveal: React.FC<FramerRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  scale = 1,
  className = '',
  blur = true,
  ...props
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        scale: scale < 1 ? scale : 1,
        filter: blur ? 'blur(8px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1], // Kanva luxury spring ease
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
