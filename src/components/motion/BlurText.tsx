import React from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  italicWords?: string[];
  italicClassName?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0.05,
  animateBy = 'words',
  italicWords = [],
  italicClassName = 'italic text-[#3c4433]'
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: i * 0.1 }
    })
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 12
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 140
      }
    }
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {elements.map((el, index) => {
        const cleanWord = el.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        const isItalic = italicWords.some(
          (w) => w.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block whitespace-nowrap mr-[0.25em] last:mr-0 ${
              isItalic ? italicClassName : ''
            }`}
          >
            {el}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
