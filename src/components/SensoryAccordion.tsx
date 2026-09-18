import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Leaf, Recycle, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { transitions } from '../lib/motion';

interface BenefitItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  imageUrl: string;
  badge: string;
}

const BENEFITS: BenefitItem[] = [
  {
    id: 'benefit-1',
    number: '01',
    title: 'Daily Ayurvedic Rituals',
    subtitle: 'Nourish Cellular Vitality & Skin Barrier',
    description: 'Ancient Rasayana formulations calibrated for daily equilibrium. Infuses deep phyto-lipids and anti-oxidative flavonoids to support cellular renewal and sustained radiance.',
    points: [
      'Clinically proven moisture retention >48h',
      'Supports natural collagen synthesis with Saffron bio-actives',
      'Non-greasy, fast absorbing botanical carrier oils',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
    badge: 'Clinical Efficacy',
  },
  {
    id: 'benefit-2',
    number: '02',
    title: 'Vedic Taila Paka Extraction',
    subtitle: 'Cold-Pressed Without Chemical Solvents',
    description: 'We adhere to the 5,000-year-old Taila Paka Vidhi: gentle slow-simmering over brass cauldrons for 72 hours, extracting both water-soluble and lipid-soluble botanical essences.',
    points: [
      'Zero petroleum derivatives, hexane, or acetone solvents',
      'Full-spectrum phytochemical fingerprint preservation',
      'Standardized with modern HPLC purity testing',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
    badge: '72h Slow Decoction',
  },
  {
    id: 'benefit-3',
    number: '03',
    title: 'Sustainable Sourcing & Amber Glass',
    subtitle: 'Harvested in Harmony With Native Ecosystems',
    description: 'Formulated in Sangamner with herbs harvested at peak lunar cycles by indigenous Sahyadri foraging collectives. Sealed in UV-protective amber glass jars to protect potency.',
    points: [
      'Fair-trade prices guaranteed to local farming families',
      '100% recyclable pharmaceutical-grade amber glass',
      'Zero synthetic micro-plastics or chemical binders',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200&auto=format&fit=crop',
    badge: 'Fair Trade Sourced',
  },
];

export const SensoryAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-[#f5f4ef] border-t border-[rgba(26,28,24,0.06)]">
      <div className="kanva-container">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#757d5c] font-semibold block mb-2">
            HOLISTIC FORMULATION PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1a1c18] font-normal leading-[1.1] tracking-[-0.03em]">
            Sensory Botanical Benefits, <br />
            <span className="italic text-[#2b3323]">Rooted in Vedic Science.</span>
          </h2>
        </div>

        {/* 2-Column Split: Dynamic Media Preview + Interactive Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Synchronized Media Preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/4.5] sm:aspect-[4/4] rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#e8e8e1] border border-[rgba(26,28,24,0.08)] shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={BENEFITS[activeIndex].id}
                  src={BENEFITS[activeIndex].imageUrl}
                  alt={BENEFITS[activeIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/30 text-xs font-mono text-[#1a1c18] font-semibold shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#dac5a7]" />
                  <span>{BENEFITS[activeIndex].badge}</span>
                </div>
              </div>

              {/* Bottom Subtle Overlay Bar */}
              <div className="absolute bottom-6 inset-x-6 z-20 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dac5a7] block">
                  Stage {BENEFITS[activeIndex].number} of 03
                </span>
                <p className="font-serif text-sm sm:text-base font-normal mt-0.5">
                  {BENEFITS[activeIndex].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-6 space-y-4">
            {BENEFITS.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl sm:rounded-3xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-white border-[rgba(26,28,24,0.14)] shadow-md p-6 sm:p-8'
                      : 'bg-white/60 hover:bg-white/90 border-[rgba(26,28,24,0.06)] p-5 sm:p-6 cursor-pointer'
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold transition-colors ${
                          isActive ? 'text-[#2b3323]' : 'text-[#1a1c18]/40'
                        }`}
                      >
                        {item.number}
                      </span>
                      <h3
                        className={`font-serif text-xl sm:text-2xl font-normal transition-colors ${
                          isActive ? 'text-[#1a1c18]' : 'text-[#1a1c18]/80'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isActive
                          ? 'bg-[#2b3323] text-white rotate-90'
                          : 'bg-[#f5f4ef] text-[#1a1c18]/60 hover:text-[#1a1c18]'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={transitions.springSmooth}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 sm:pt-6 space-y-4 border-t border-[rgba(26,28,24,0.06)] mt-4">
                          <p className="text-xs sm:text-sm text-[#1a1c18]/75 font-body leading-relaxed">
                            {item.description}
                          </p>

                          <div className="space-y-2 pt-1">
                            {item.points.map((point, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-start gap-2.5 text-xs text-[#1a1c18]/85 font-medium"
                              >
                                <span className="w-4 h-4 rounded-full bg-[#eae6df] text-[#2b3323] flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
