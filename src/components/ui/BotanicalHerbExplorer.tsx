import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Microscope, CheckCircle2, ShieldAlert, Award, Compass } from 'lucide-react';
import { BorderBeam } from './BorderBeam';

interface HerbDetail {
  name: string;
  sanskritName: string;
  botanicalFamily: string;
  standardizedCompound: string;
  activePercentage: string;
  harvestLocation: string;
  clinicalBenefit: string;
  image: string;
}

const HERBS: HerbDetail[] = [
  {
    name: 'Himalayan Shilajit Resin',
    sanskritName: 'Shilajatu (Rock Invincible)',
    botanicalFamily: 'Mineral Pitch / Phytocomplex',
    standardizedCompound: 'Fulvic Acid + 84+ Trace Ionic Minerals',
    activePercentage: '>75% Certified Fulvic Purity',
    harvestLocation: 'Gilgit-Baltistan & Ladakh Altitudes (18,000+ ft)',
    clinicalBenefit: 'Cellular ATP energy synthesis, free-radical neutralization, mitochondrial longevity.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Organic KSM-66 Ashwagandha',
    sanskritName: 'Ashvagandha (Horse Stamina)',
    botanicalFamily: 'Withania Somnifera (Solanaceae)',
    standardizedCompound: 'Withanolides Concentration',
    activePercentage: '5.0% HPLC Standardized Withanolides',
    harvestLocation: 'Certified Organic Farms of Rajasthan & MP',
    clinicalBenefit: 'Reduces serum cortisol by 27.9%, balances HPA axis, promotes restorative REM sleep.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pure Kashmiri Saffron (Kumkumadi)',
    sanskritName: 'Kumkuma (Golden Radiance)',
    botanicalFamily: 'Crocus Sativus (Iridaceae)',
    standardizedCompound: 'Crocin & Safranal Bio-Active Glycosides',
    activePercentage: 'Grade 1 Mongra Kashmiri Filament',
    harvestLocation: 'Pampore Valleys, Jammu & Kashmir',
    clinicalBenefit: 'Melanin regulation, deep micro-capillary illumination, cellular collagen synthesis.',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Wild Forest Triphala Extract',
    sanskritName: 'Phalatrikam (Three Sacred Fruits)',
    botanicalFamily: 'Amla, Haritaki & Bibhitaki Trio',
    standardizedCompound: 'Gallic Acid & Tannins Antioxidants',
    activePercentage: '45% Polyphenol Complex',
    harvestLocation: 'Protected Satpura Forest Reserves',
    clinicalBenefit: 'Microbiome restoration, mucosal barrier regeneration, metabolic detox balance.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  },
];

interface BotanicalHerbExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BotanicalHerbExplorer: React.FC<BotanicalHerbExplorerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedHerb, setSelectedHerb] = useState<HerbDetail>(HERBS[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#191c18]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#e8e8e1]"
        >
          <BorderBeam size={280} duration={16} colorFrom="#dac5a7" colorTo="#3c4433" />

          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#2b3323] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-white/10 text-[#dac5a7]">
                <Microscope className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-[#dac5a7]">
                  Clinical Phytochemistry Lab
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  Botanical Extraction Microscope
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Herb Selection List */}
            <div className="md:col-span-5 space-y-2.5">
              <span className="text-xs uppercase tracking-wider font-mono text-[#1a1c18]/50 block mb-1">
                Select Active Specimen
              </span>
              {HERBS.map((herb) => (
                <button
                  key={herb.name}
                  onClick={() => setSelectedHerb(herb)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                    selectedHerb.name === herb.name
                      ? 'bg-[#2b3323] text-white border-[#2b3323] shadow-md'
                      : 'bg-[#f9f9f7] text-[#1a1c18] border-[#e8e8e1] hover:bg-[#ffffff] hover:border-[#dac5a7]'
                  }`}
                >
                  <img
                    src={herb.image}
                    alt={herb.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-inner"
                  />
                  <div className="min-w-0">
                    <div className="font-serif text-base truncate font-medium">{herb.name}</div>
                    <div
                      className={`text-xs truncate font-mono mt-0.5 ${
                        selectedHerb.name === herb.name ? 'text-[#dac5a7]' : 'text-[#1a1c18]/60'
                      }`}
                    >
                      {herb.sanskritName}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Herb Phytochemical Breakdown */}
            <div className="md:col-span-7 bg-[#fbfbfa] rounded-2xl border border-[#e8e8e1] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#757d5c] uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" /> HPLC Verified Monograph
                </div>
                <h3 className="text-2xl font-serif text-[#2b3323]">{selectedHerb.name}</h3>
                <div className="text-xs font-mono text-[#1a1c18]/60 italic mt-0.5">
                  {selectedHerb.botanicalFamily}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
                  <div className="p-3.5 rounded-xl bg-white border border-[#e8e8e1]">
                    <span className="text-[11px] font-mono uppercase text-[#1a1c18]/50 block">
                      Standardized Bio-Active
                    </span>
                    <span className="text-sm font-semibold text-[#1a1c18] mt-1 block">
                      {selectedHerb.standardizedCompound}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#e8e8e1]">
                    <span className="text-[11px] font-mono uppercase text-[#1a1c18]/50 block">
                      Active Potency Rating
                    </span>
                    <span className="text-sm font-semibold text-[#2b3323] mt-1 block">
                      {selectedHerb.activePercentage}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1a1c18]/80">
                    <Compass className="w-4 h-4 text-[#757d5c] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1a1c18]">Lunar Harvest Origin:</strong>{' '}
                      {selectedHerb.harvestLocation}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1a1c18]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#757d5c] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1a1c18]">Clinical Trial Bio-Action:</strong>{' '}
                      {selectedHerb.clinicalBenefit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#e8e8e1] flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-[#1a1c18]/60 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#dac5a7]" /> Heavy-Metal & Pesticide Zero Residue
                </span>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-[#2b3323] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#191c18] transition-colors cursor-pointer"
                >
                  Explore Formulations
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
