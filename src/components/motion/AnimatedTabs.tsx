import React from 'react';
import { motion } from 'motion/react';

interface Tab {
  id: string;
  label: string;
  count?: number | string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-0.5 sm:gap-1 p-1 bg-white/90 backdrop-blur-md rounded-full border border-[rgba(26,28,24,0.08)] shadow-[0_2px_8px_rgba(26,28,24,0.04)] shrink-0 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-3.5 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none whitespace-nowrap ${
              isActive ? 'text-white font-semibold' : 'text-[#1a1c18]/80 hover:text-[#1a1c18]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-[#1a1c18] rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/25 text-white' : 'bg-black/5 text-[#1a1c18]/70'
                }`}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
