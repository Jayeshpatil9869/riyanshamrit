import React from 'react';

interface ShimmerBadgeProps {
  children: React.ReactNode;
  className?: string;
  badgeClassName?: string;
}

export const ShimmerBadge: React.FC<ShimmerBadgeProps> = ({
  children,
  className = '',
  badgeClassName = 'bg-[#e8e8e1]/80 text-[#1a1c18]'
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center p-px overflow-hidden rounded-full group ${className}`}
    >
      {/* Animated glowing border gradient */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#dac5a7]/0 via-[#dac5a7]/80 to-[#dac5a7]/0 group-hover:from-[#757d5c]/0 group-hover:via-[#757d5c]/80 group-hover:to-[#757d5c]/0 transition-all duration-700 animate-[shimmer_3s_ease-in-out_infinite]" />
      
      {/* Badge inner container */}
      <span
        className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[0.14em] uppercase font-medium backdrop-blur-xs transition-colors ${badgeClassName}`}
      >
        {children}
      </span>
    </div>
  );
};
