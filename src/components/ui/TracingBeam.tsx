import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'motion/react';

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export const TracingBeam: React.FC<TracingBeamProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 100]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-7xl mx-auto ${className}`}
    >
      <div className="absolute -left-4 md:-left-12 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-neutral-300 shadow-sm flex items-center justify-center bg-white"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            className="h-2 w-2 rounded-full border border-neutral-400 bg-[#3c4433]"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-8 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient-beam)"
            strokeWidth="1.75"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient-beam"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#dac5a7" stopOpacity="0"></stop>
              <stop stopColor="#dac5a7"></stop>
              <stop offset="0.325" stopColor="#3c4433"></stop>
              <stop offset="1" stopColor="#3c4433" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
