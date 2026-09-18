import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface InteractiveHotspotProps {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  subtitle?: string;
  badge?: string;
  linkText?: string;
  onAction?: () => void;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export const InteractiveHotspot: React.FC<InteractiveHotspotProps> = ({
  x,
  y,
  title,
  subtitle,
  badge = 'Botanical Active',
  linkText = 'Explore Formula',
  onAction,
  direction = 'top'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Position the popover based on direction
  const getPopoverPosition = () => {
    switch (direction) {
      case 'bottom':
        return 'top-8 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-8 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-8 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-8 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Pulsing Hotspot Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Inspect ${title}`}
        className="relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none group cursor-pointer"
      >
        {/* Outer pulsating aura */}
        <span className="absolute inset-0 rounded-full bg-white/40 animate-ping duration-1000" />
        
        {/* Middle soft white glow */}
        <span className="absolute inset-1 rounded-full bg-white/80 shadow-md transition-transform group-hover:scale-125" />
        
        {/* Core dark dot */}
        <span className="relative w-2.5 h-2.5 rounded-full bg-[#1a1c18] group-hover:bg-[#3c4433] transition-colors" />
      </button>

      {/* Floating Animated Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: direction === 'top' ? 8 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: direction === 'top' ? 8 : -8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`absolute ${getPopoverPosition()} w-56 sm:w-64 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[rgba(26,28,24,0.12)] shadow-[0_12px_32px_rgba(26,28,24,0.15)] pointer-events-auto text-left z-30`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-[#757d5c] font-semibold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>{badge}</span>
            </div>

            <h4 className="font-serif text-sm font-normal text-[#1a1c18] leading-snug">
              {title}
            </h4>

            {subtitle && (
              <p className="text-[11px] text-[#1a1c18]/65 font-body leading-relaxed mt-1">
                {subtitle}
              </p>
            )}

            {onAction && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction();
                }}
                className="mt-2.5 pt-2 border-t border-[rgba(26,28,24,0.06)] flex items-center justify-between w-full text-[11px] font-medium text-[#3c4433] hover:text-[#1a1c18] transition-colors group/btn"
              >
                <span>{linkText}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
