import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { Currency } from '../types';
import { X, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CurrencyOption {
  code: Currency;
  name: string;
  symbol: string;
  country: string;
  flag: string;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({ isOpen, onClose }) => {
  const { currency, setCurrency, addToast } = useCommerce();

  const options: CurrencyOption[] = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India', flag: '🇮🇳' },
    { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States & Worldwide', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union', flag: '🇪🇺' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1a1c18]/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-[rgba(26,28,24,0.1)] shadow-[0_24px_60px_rgba(26,28,24,0.2)] z-10"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(26,28,24,0.06)]">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#757d5c]" />
              <h3 className="font-serif text-xl font-normal text-[#1a1c18]">
                Currency & Region
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f2f2ef] text-[#1a1c18]/60 hover:text-[#1a1c18] transition-colors cursor-pointer"
              aria-label="Close currency modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#1a1c18]/65 font-body mt-3 mb-5 leading-relaxed">
            Select your preferred display currency for all classical formulation prices and checkout estimates.
          </p>

          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = currency === opt.code;
              return (
                <button
                  key={opt.code}
                  onClick={() => {
                    setCurrency(opt.code);
                    addToast(`Display currency changed to ${opt.name} (${opt.symbol})`, 'info');
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#3c4433] text-white border-[#3c4433] shadow-sm'
                      : 'bg-[#f2f2ef]/70 hover:bg-[#e8e8e1] text-[#1a1c18] border-[rgba(26,28,24,0.06)]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <span className="text-2xl">{opt.flag}</span>
                    <div>
                      <div className="font-sans text-xs font-semibold flex items-center gap-1.5">
                        <span>{opt.name}</span>
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-[#1a1c18]/60'
                        }`}>
                          {opt.code}
                        </span>
                      </div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#1a1c18]/50'}`}>
                        {opt.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold">
                      {opt.symbol}
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#dac5a7]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[rgba(26,28,24,0.06)] flex items-center justify-between text-[11px] text-[#1a1c18]/50 font-mono">
            <span>Dispatched from Sangamner, India</span>
            <span>Live Conversion</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
