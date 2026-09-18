import React from 'react';
import { Sparkles, ShieldCheck, Leaf, Award, Recycle, Heart, CheckCircle2 } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { icon: Leaf, text: '100% Pure Botanical Actives' },
    { icon: ShieldCheck, text: 'No Harsh Synthetic Chemicals' },
    { icon: Sparkles, text: 'Clinical Proof & Proven Efficacy' },
    { icon: Recycle, text: 'Eco-Friendly Amber Glass Packaging' },
    { icon: Heart, text: 'Ethically Sourced & Cruelty-Free' },
    { icon: Award, text: 'ISO 9001:2015 & GMP Certified' },
    { icon: CheckCircle2, text: 'Heavy-Metal Lab Tested' },
  ];

  return (
    <div
      id="marquee-ticker"
      className="w-full bg-[#2b3323] text-[#efedfd] py-3.5 overflow-hidden border-y border-white/10 select-none group"
    >
      <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-xs font-mono font-medium tracking-[0.12em] uppercase text-[#dac5a7] shrink-0 px-6"
            >
              <Icon className="w-3.5 h-3.5 text-[#dac5a7]" />
              <span>{item.text}</span>
              <span className="text-[#dac5a7]/40 pl-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
