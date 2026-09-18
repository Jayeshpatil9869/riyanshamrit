import React from 'react';

interface HaikeiBackgroundProps {
  variant?: 'contour' | 'wave' | 'blob' | 'mesh';
  className?: string;
  opacity?: number;
}

export const HaikeiBackground: React.FC<HaikeiBackgroundProps> = ({
  variant = 'contour',
  className = '',
  opacity = 0.4,
}) => {
  if (variant === 'wave') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            fill="#dac5a7"
            fillOpacity="0.25"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,165.3C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#3c4433"
            fillOpacity="0.12"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,117.3C960,107,1056,149,1152,170.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }

  if (variant === 'blob') {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#dac5a7]/30 blur-3xl animate-pulse-subtle" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#3c4433]/20 blur-3xl animate-pulse-subtle" />
      </div>
    );
  }

  // Default: Organic Contour Topographic
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-40"
        viewBox="0 0 900 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#2b3323" strokeWidth="0.75" strokeOpacity="0.25">
          <ellipse cx="450" cy="300" rx="400" ry="250" />
          <ellipse cx="450" cy="300" rx="340" ry="210" />
          <ellipse cx="450" cy="300" rx="280" ry="170" />
          <ellipse cx="450" cy="300" rx="220" ry="130" />
          <ellipse cx="450" cy="300" rx="160" ry="90" />
          <ellipse cx="450" cy="300" rx="100" ry="50" />
        </g>
      </svg>
    </div>
  );
};
