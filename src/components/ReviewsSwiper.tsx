import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { transitions } from '../lib/motion';

interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  product: string;
  avatarUrl: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    quote: 'My skin has never felt more balanced, supple, and radiant. The Kumkumadi Youth Elixir is a masterclass in classical Ayurvedic lipid chemistry.',
    author: 'Ananya Sharma',
    role: 'Verified Customer',
    product: 'Kumkumadi Youth Elixir',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 'rev-2',
    quote: 'As an Ayurvedic practitioner with 18 years of clinical experience, I consistently prescribe Riyansh Amrit formulations for their authentic Taila Paka adherence and HPLC tested botanical integrity.',
    author: 'Dr. Ramesh Deshmukh',
    role: 'Registered Vaidya & Ayurvedic Physician',
    product: 'Shilajit Gold Resin & Amrit Juice',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote: 'The amber glass dropper, the earthy natural aroma, and the immediate soothing sensation on sensitized skin make this the pinnacle of sustainable wellness.',
    author: 'Priya Mukherjee',
    role: 'Wellness Columnist & Customer',
    product: 'Moringa Phyto-Drops',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

export const ReviewsSwiper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#eae6df]/40 border-t border-[rgba(26,28,24,0.06)]">
      <div className="kanva-container max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#757d5c] font-semibold">
            VOICES OF TRANSFORMATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal leading-tight">
            What Our Community Is Saying
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-14 border border-[rgba(26,28,24,0.08)] shadow-[0_12px_36px_rgba(26,28,24,0.04)]">
          
          <div className="flex items-center justify-between mb-8">
            {/* 5 Stars Rating */}
            <div className="flex items-center gap-1">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d99b26] text-[#d99b26]" />
              ))}
              <span className="font-mono text-xs font-bold text-[#1a1c18] ml-2">5.0 / 5.0</span>
            </div>

            {/* Verified Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#757d5c] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Customer</span>
            </div>
          </div>

          {/* Quote in Sentient Italic */}
          <div className="min-h-[140px] sm:min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentReview.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={transitions.springSmooth}
                className="font-serif text-xl sm:text-3xl text-[#1a1c18] font-normal leading-[1.35] tracking-[-0.02em]"
              >
                “{currentReview.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Footer with Author and Controls */}
          <div className="mt-8 pt-6 border-t border-[rgba(26,28,24,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Author Meta */}
            <div className="flex items-center gap-4">
              <img
                src={currentReview.avatarUrl}
                alt={currentReview.author}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#dac5a7]"
              />
              <div>
                <h4 className="font-sans text-sm font-bold text-[#1a1c18]">
                  {currentReview.author}
                </h4>
                <p className="text-xs text-[#1a1c18]/60 font-body">
                  {currentReview.role} • <span className="text-[#2b3323] font-medium">{currentReview.product}</span>
                </p>
              </div>
            </div>

            {/* Navigation Arrows & Counter */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-mono text-[#1a1c18]/50">
                0{currentIndex + 1} / 0{REVIEWS.length}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-[#f5f4ef] hover:bg-[#eae6df] text-[#1a1c18] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-[#1a1c18] hover:bg-[#2b3323] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
