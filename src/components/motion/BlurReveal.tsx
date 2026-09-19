import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  initial: {
    opacity: 0.001,
    y: 20,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
      mass: 0.9,
    },
  },
};

export interface BlurRevealItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const BlurRevealItem: React.FC<BlurRevealItemProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay }}
      className={className}
      style={{ willChange: 'transform, filter, opacity' }}
    >
      {children}
    </motion.div>
  );
};

// Split Text Blur Wave (Signature Kanva Headline Blur Reveal)
export interface BlurWaveTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  italicIndices?: number[];
  italicClassName?: string;
  stagger?: number;
}

export const BlurWaveText: React.FC<BlurWaveTextProps> = ({
  text,
  as: Tag = 'h1',
  className = '',
  italicIndices = [],
  italicClassName = 'italic text-[#dac5a7]',
  stagger = 0.06
}) => {
  const words = text.split(' ');

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        style={{ display: 'inline-flex', flexWrap: 'wrap', willChange: 'transform, filter, opacity' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className={italicIndices.includes(i) ? italicClassName : ''}
            style={{ display: 'inline-block', marginRight: '0.28em', whiteSpace: 'nowrap' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};
