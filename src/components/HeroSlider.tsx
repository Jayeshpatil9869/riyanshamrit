import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Star, ShieldCheck, Play, Pause } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { transitions } from '../lib/motion';

interface HeroSlide {
  id: string;
  tag: string;
  titlePrefix: string;
  titleItalic: string;
  titleSuffix?: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    tag: '100% ORGANIC • CLINICALLY STANDARDIZED',
    titlePrefix: 'Refresh your skin,',
    titleItalic: 'renew your glow.',
    titleSuffix: 'Live purely.',
    description: 'Bespoke Ayurvedic botanical formulations stripped to high-potency essentials. Sourced from wild-harvested Sahyadri herbs and cold-extracted with Vedic precision.',
    mediaType: 'video',
    mediaUrl: '/assets/video/kanva-hero.mp4',
    badge: 'Certified Ayurvedic • Cruelty-Free',
    ctaText: 'Shop Collection',
    ctaLink: '/store',
  },
  {
    id: 'slide-2',
    tag: 'ANCIENT RASAYANA BOTANY',
    titlePrefix: 'Pure botanical oils,',
    titleItalic: 'deep cellular vitality.',
    titleSuffix: '',
    description: 'Gold-grade Himalayan Shilajit, KSM-66 Ashwagandha, and saffron-infused Kumkumadi Elixir engineered for nocturnal cellular repair and radiant skin longevity.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1800&auto=format&fit=crop',
    badge: 'Heavy Metal Tested • 100% Pure',
    ctaText: 'Explore Rituals',
    ctaLink: '/store',
  },
  {
    id: 'slide-3',
    tag: 'SUSTAINABLE LUXURY APOTHECARY',
    titlePrefix: 'Formulated in harmony,',
    titleItalic: 'sealed in amber glass.',
    titleSuffix: '',
    description: 'Zero chemical binders, zero parabens, zero synthetic fragrance. Sealed in pharmaceutical-grade amber glass to lock in photo-sensitive active phyto-nutrients.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1800&auto=format&fit=crop',
    badge: '100% Recyclable Packaging',
    ctaText: 'View Bestsellers',
    ctaLink: '/store',
  },
];

interface HeroSliderProps {
  onOpenQuiz: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenQuiz }) => {
  const { navigate } = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4ef] py-8 sm:py-14 lg:py-16">
      <div className="kanva-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Overline Badge */}
            <motion.div
              key={`badge-${currentSlide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eae6df] border border-[rgba(26,28,24,0.08)] text-[11px] font-mono tracking-[0.18em] uppercase text-[#2b3323]"
            >
              <span className="w-2 h-2 rounded-full bg-[#757d5c] animate-pulse" />
              <span>{currentSlide.tag}</span>
            </motion.div>

            {/* Display Headline */}
            <div className="min-h-[160px] sm:min-h-[210px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${currentSlide.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={transitions.springSmooth}
                >
                  <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-[-0.035em] text-[#1a1c18]">
                    {currentSlide.titlePrefix} <br className="hidden sm:block" />
                    <span className="italic font-normal text-[#2b3323] drop-shadow-xs">
                      {currentSlide.titleItalic}
                    </span>{' '}
                    {currentSlide.titleSuffix && (
                      <span className="block sm:inline">{currentSlide.titleSuffix}</span>
                    )}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="text-sm sm:text-base text-[#1a1c18]/75 font-body leading-relaxed max-w-xl"
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                id="hero-primary-cta"
                onClick={() => navigate(currentSlide.ctaLink)}
                className="px-8 py-4 rounded-full bg-[#1a1c18] hover:bg-[#2b3323] text-white text-xs font-mono tracking-widest uppercase font-semibold transition-all shadow-[0_10px_25px_rgba(26,28,24,0.15)] flex items-center gap-2 cursor-pointer"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#dac5a7]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenQuiz}
                className="px-6 py-4 rounded-full bg-white hover:bg-[#eae6df] text-[#1a1c18] border border-[rgba(26,28,24,0.14)] text-xs font-mono tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#757d5c]" />
                <span>Dosha Diagnostic</span>
              </motion.button>
            </div>

            {/* Social Proof Rating Card */}
            <div className="pt-4 flex items-center gap-4 border-t border-[rgba(26,28,24,0.08)]">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#f5f4ef] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Patron Reviewer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#f5f4ef] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Patron Reviewer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#f5f4ef] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Patron Reviewer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#f5f4ef] object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Patron Reviewer"
                />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d99b26] text-[#d99b26]" />
                  ))}
                  <span className="font-mono text-xs font-bold text-[#1a1c18] ml-1.5">4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-[#1a1c18]/60 font-body">
                  From 2,400+ Verified Vedic Patrons & Physicians
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Media Swiper Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/4.2] rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#e8e8e1] border border-[rgba(26,28,24,0.1)] shadow-[0_20px_50px_rgba(26,28,24,0.12)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`media-${currentSlide.id}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  {currentSlide.mediaType === 'video' ? (
                    <video
                      src={currentSlide.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={currentSlide.mediaUrl}
                      alt={currentSlide.titlePrefix}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Gradient vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 z-20">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[11px] font-mono tracking-wider text-[#1a1c18] font-semibold shadow-md flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2b3323]" />
                  <span>{currentSlide.badge}</span>
                </motion.div>
              </div>

              {/* Bottom Swiper Controls & Progress */}
              <div className="absolute bottom-5 inset-x-5 z-20 flex items-center justify-between p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-lg">
                {/* Dots indicator */}
                <div className="flex items-center gap-2 pl-2">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlideIndex === idx
                          ? 'w-7 bg-[#2b3323]'
                          : 'w-2 bg-[#1a1c18]/25 hover:bg-[#1a1c18]/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation arrows & Play/Pause */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1a1c18] flex items-center justify-center transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1a1c18] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full bg-[#1a1c18] text-white hover:bg-[#2b3323] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
