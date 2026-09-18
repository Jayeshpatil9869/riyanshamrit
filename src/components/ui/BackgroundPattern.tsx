import React from 'react';

interface BackgroundPatternProps {
  className?: string;
  dotColor?: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  className = '',
  dotColor = 'rgba(26, 28, 24, 0.05)'
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full stroke-current"
        style={{ color: dotColor }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="kanva-dot-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#kanva-dot-pattern)" />
      </svg>
    </div>
  );
};
