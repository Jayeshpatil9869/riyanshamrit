import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.08em',
      shimmerDuration = '2.5s',
      borderRadius = '9999px',
      background = '#1a1c18',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-7 py-3.5 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-[#dac5a7]/10 ${className}`}
        {...props}
      >
        {/* Shimmer Border Spark */}
        <div className="absolute inset-0 -z-30 overflow-visible [container-type:size]">
          <div className="absolute inset-0 h-[100cqh] animate-[shimmer_3s_linear_infinite] [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-slow absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Backing surface */}
        <div className="absolute inset-[1px] -z-20 rounded-[inherit] bg-[var(--bg)] transition-colors duration-300 group-hover:bg-[#23271f]" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
