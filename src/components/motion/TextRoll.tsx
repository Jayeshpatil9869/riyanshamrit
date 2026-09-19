import React from 'react';
import { Link } from '../../context/RouterContext';

interface TextRollProps {
  children: string;
  href?: string;
  className?: string;
  staggered?: boolean;
}

export const TextRoll: React.FC<TextRollProps> = ({
  children,
  href = '#',
  className = '',
  staggered = false,
}) => {
  const content = children;

  if (staggered) {
    return (
      <Link
        to={href}
        className={`group inline-flex overflow-hidden h-[1.35em] leading-[1.35em] font-body text-[13.5px] cursor-pointer ${className}`}
      >
        {content.split('').map((char, index) => (
          <span key={index} className="inline-flex flex-col">
            <span
              className="text-white/60 transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${index * 15}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
            <span
              className="text-white font-medium transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${index * 15}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className={`group inline-flex flex-col h-[1.35em] overflow-hidden leading-[1.35em] font-body text-[13.5px] cursor-pointer ${className}`}
    >
      {/* Top Default Text (Rolls UP & Exits) */}
      <span className="text-white/60 transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block">
        {content}
      </span>
      {/* Bottom Duplicate Text (Rolls UP & Enters) */}
      <span className="text-white font-medium transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block">
        {content}
      </span>
    </Link>
  );
};
