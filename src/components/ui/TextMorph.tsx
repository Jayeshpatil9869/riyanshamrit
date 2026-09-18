import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TextMorphProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const TextMorph: React.FC<TextMorphProps> = ({
  words,
  duration = 3000,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span className={`inline-flex relative overflow-hidden py-1 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 28, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -28, opacity: 0, filter: 'blur(6px)' }}
          transition={{
            duration: 0.5,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="inline-block text-[#dac5a7] italic font-serif"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
