import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { RIYANSH_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { InteractiveHotspot } from '../components/motion/InteractiveHotspot';
import { MagneticButton } from '../components/motion/MagneticButton';
import { AnimatedTabs } from '../components/motion/AnimatedTabs';
import { BorderBeam } from '../components/ui/BorderBeam';
import { ShimmerButton } from '../components/ui/ShimmerButton';
import { HaikeiBackground } from '../components/ui/HaikeiBackground';
import { FramerReveal } from '../components/motion/FramerReveal';
import { BlurRevealItem, BlurWaveText } from '../components/motion/BlurReveal';
import { InteractiveDoshaQuiz } from '../components/ui/InteractiveDoshaQuiz';
import { BotanicalHerbExplorer } from '../components/ui/BotanicalHerbExplorer';
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Heart,
  Truck,
  Package,
  Check,
  Instagram,
  Sparkles,
  Star,
  Pipette
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { addToast } = useCommerce();

  // Modals for rich interaction
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Category Tabs for Products Grid (Exact 3 Pills from Reference Image)
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('bestsellers');

  const categoryTabs = [
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'Sale' },
  ];

  const filteredProducts = React.useMemo(() => {
    if (selectedCategoryTab === 'bestsellers') {
      return RIYANSH_PRODUCTS.filter((p) => p.bestseller || p.featured).slice(0, 3);
    }
    if (selectedCategoryTab === 'new') {
      return RIYANSH_PRODUCTS.filter((p) => p.isNew || p.tag === 'NEW' || p.rating >= 4.9).slice(0, 3);
    }
    if (selectedCategoryTab === 'sale') {
      return RIYANSH_PRODUCTS.filter((p) => p.compareAtPrice > p.price).slice(0, 3);
    }
    return RIYANSH_PRODUCTS.slice(0, 3);
  }, [selectedCategoryTab]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Thank you for subscribing to Kanva Skincare!', 'success');
  };

  return (
    <div className="w-full relative bg-[#f2f2ef] text-[#1a1c18]">
      
      {/* 1. HERO SECTION (Exact Match to Reference Screenshot with Kanva Blur-Wave Curtain) */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-start overflow-hidden bg-[#e8e8e1]">
        {/* Full-Bleed Glowing Model Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/HZza3nP13tfji9AKlwWHer1tP4.webp"
            alt="Natural Skincare Model"
            className="w-full h-full object-cover object-top sm:object-[center_20%] brightness-[0.92] contrast-[1.04]"
          />
          {/* Subtle cinematic left vignette for typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/55 sm:via-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f2f2ef] to-transparent" />
          {/* Progressive Masked Blur Wave */}
          <div className="blur-wave-bottom opacity-70" />
        </div>

        {/* Hero Content Container */}
        <div className="kanva-container relative z-10 w-full pt-16 pb-24 sm:py-28">
          <div className="max-w-xl text-white space-y-6">
            
            {/* Display Heading with Staggered Word Blur Wave */}
            <BlurRevealItem delay={0.1}>
              <h1 className="font-serif text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-normal leading-[0.96] tracking-[-0.035em] text-white">
                Natural <br />
                <span className="italic font-normal text-[#dac5a7]">
                  Skincare
                </span>
              </h1>
            </BlurRevealItem>

            {/* Subtext Paragraph with Smooth Blur Settling */}
            <BlurRevealItem delay={0.25}>
              <p className="text-sm sm:text-base text-white/90 font-body leading-relaxed max-w-md">
                Plant-powered skincare products crafted with 100% organic ingredients for a healthy, radiant and natural glow.
              </p>
            </BlurRevealItem>

            {/* CTA Pill Button */}
            <BlurRevealItem delay={0.35} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                id="hero-shop-now"
                onClick={() => navigate('/store')}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-[#dac5a7] text-[#1a1c18] text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Now</span>
              </motion.button>
            </BlurRevealItem>

          </div>
        </div>
      </section>

      {/* 2. THE 4 VALUE PILLARS BAR (Exact 1:1 Clone with Reference Image) */}
      <section className="relative -mt-8 sm:-mt-12 lg:-mt-14 z-20">
        <div className="kanva-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Pillar 1: Natural Formula */}
            <div className="py-7 px-6 sm:py-8 sm:px-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[rgba(26,28,24,0.06)] shadow-[0_4px_24px_rgba(26,28,24,0.03)] flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3">
              <div className="text-[#1a1c18] flex items-center justify-center mb-0.5">
                <svg className="w-6 h-6 text-[#1a1c18]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21v-7" />
                  <path d="M12 14c-3.5 0-6.5-2.5-6.5-6 3.5 0 6.5 2.5 6.5 6Z" />
                  <path d="M12 14c3.5 0 6.5-2.5 6.5-6-3.5 0-6.5 2.5-6.5 6Z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#1a1c18] font-normal tracking-tight">
                Natural Formula
              </h3>
              <p className="text-[13.5px] xs:text-[14px] text-[#1a1c18]/75 font-sans leading-relaxed max-w-[260px] sm:max-w-none">
                Crafted with pure, skin-loving ingredients for ultimate care.
              </p>
            </div>

            {/* Pillar 2: Cruelty-Free */}
            <div className="py-7 px-6 sm:py-8 sm:px-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[rgba(26,28,24,0.06)] shadow-[0_4px_24px_rgba(26,28,24,0.03)] flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3">
              <div className="text-[#1a1c18] flex items-center justify-center mb-0.5">
                <svg className="w-6 h-6 text-[#1a1c18]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5.5c.67 0 1.35.09 2 .26 1.78-2 3.03-2.26 4-.26.54 1.12.3 2.1-.26 3.5 1.5 1.6 2.26 3.4 2.26 5.5 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.1.76-3.9 2.26-5.5-.56-1.4-.8-2.38-.26-3.5.97-2 2.22-1.74 4 .26.65-.17 1.33-.26 2-.26Z" />
                  <circle cx="9.5" cy="13" r="0.9" fill="currentColor" />
                  <circle cx="14.5" cy="13" r="0.9" fill="currentColor" />
                  <path d="m11 15.5 1 .8 1-.8" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#1a1c18] font-normal tracking-tight">
                Cruelty-Free
              </h3>
              <p className="text-[13.5px] xs:text-[14px] text-[#1a1c18]/75 font-sans leading-relaxed max-w-[260px] sm:max-w-none">
                Our products are never tested on animals, guaranteed ethical.
              </p>
            </div>

            {/* Pillar 3: Expert Approved */}
            <div className="py-7 px-6 sm:py-8 sm:px-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[rgba(26,28,24,0.06)] shadow-[0_4px_24px_rgba(26,28,24,0.03)] flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3">
              <div className="text-[#1a1c18] flex items-center justify-center mb-0.5">
                <svg className="w-6 h-6 text-[#1a1c18]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#1a1c18] font-normal tracking-tight">
                Expert Approved
              </h3>
              <p className="text-[13.5px] xs:text-[14px] text-[#1a1c18]/75 font-sans leading-relaxed max-w-[260px] sm:max-w-none">
                Carefully tested to ensure safety and visible results.
              </p>
            </div>

            {/* Pillar 4: Free Shipping */}
            <div className="py-7 px-6 sm:py-8 sm:px-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[rgba(26,28,24,0.06)] shadow-[0_4px_24px_rgba(26,28,24,0.03)] flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3">
              <div className="text-[#1a1c18] flex items-center justify-center mb-0.5">
                <svg className="w-6 h-6 text-[#1a1c18]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#1a1c18] font-normal tracking-tight">
                Free Shipping
              </h3>
              <p className="text-[13.5px] xs:text-[14px] text-[#1a1c18]/75 font-sans leading-relaxed max-w-[260px] sm:max-w-none">
                Delivered to your doorstep with no extra costs worldwide.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SIGNATURE EDITORIAL STATEMENT (Exact 1:1 Match to Reference Image) */}
      <section className="pt-16 pb-8 sm:pt-24 sm:pb-10 text-center relative overflow-hidden">
        <div className="kanva-container relative z-10 max-w-5xl mx-auto px-4">
          <FramerReveal>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[64px] text-[#1a1c18] font-normal leading-[1.28] sm:leading-[1.22] tracking-[-0.03em] flex flex-col items-center justify-center">
              {/* Line 1: Refresh your skin, [thumb1] love yourself, [thumb2] */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2">
                <span>Refresh your skin,</span>
                <span className="inline-block relative -rotate-3 hover:rotate-0 transition-transform duration-300 mx-1">
                  <img
                    src="/assets/images/vAsQUc57V7vQ6L24k7FTe2aAk0g.webp"
                    alt="skincare facial treatment"
                    className="w-11 h-14 sm:w-16 sm:h-20 lg:w-20 lg:h-24 rounded-2xl object-cover shadow-[0_10px_25px_rgba(0,0,0,0.12)] border-2 border-white inline-block align-middle -mt-2"
                  />
                </span>
                <span>love yourself,</span>
                <span className="inline-block relative rotate-4 hover:rotate-0 transition-transform duration-300 mx-1">
                  <img
                    src="/assets/images/QPPjUvy7yvkF7a0Pipyhv3h84.webp"
                    alt="natural clay mask"
                    className="w-11 h-14 sm:w-16 sm:h-20 lg:w-20 lg:h-24 rounded-2xl object-cover shadow-[0_10px_25px_rgba(0,0,0,0.12)] border-2 border-white inline-block align-middle -mt-2"
                  />
                </span>
              </div>

              {/* Line 2: renew your glow. [leaf] */}
              <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 mt-3 sm:mt-4">
                <span className="italic font-serif font-light text-[#1a1c18]">renew your glow.</span>
                <img
                  src="/assets/images/leaf-botanical.png"
                  alt="botanical leaf"
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22 object-contain inline-block align-middle rotate-12 drop-shadow-md -mt-2"
                />
              </div>
            </h2>
          </FramerReveal>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION (Tabs + 3-Card Grid + View All Link) */}
      <section className="pb-24 pt-4">
        <div className="kanva-container">
          
          {/* Category Filter Pills (Exact 1:1 Match with Reference Image) */}
          <div className="mb-10 sm:mb-12 flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 bg-[#eae6df] backdrop-blur-md rounded-full border border-[rgba(26,28,24,0.06)] shadow-xs">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategoryTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategoryTab(tab.id)}
                    className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                      isActive
                        ? 'bg-[#3c4433] text-white shadow-xs font-semibold'
                        : 'bg-transparent text-[#1a1c18]/75 hover:text-[#1a1c18] hover:bg-black/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Product Cards Grid */}
          <motion.div
            key={selectedCategoryTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Shop Best Sellers Underlined Link */}
          <div className="mt-12 sm:mt-14 text-center">
            <button
              onClick={() => navigate('/store')}
              className="text-sm sm:text-[15px] font-sans underline underline-offset-8 text-[#1a1c18] hover:text-[#2b3323] transition-colors cursor-pointer font-medium tracking-tight"
            >
              Shop Best Sellers
            </button>
          </div>
        </div>
      </section>

      {/* 5. "ECO-FRIENDLY, SKIN-FRIENDLY" GREEN BOTANICAL BANNER (Full-Bleed on Mobile Matching Reference) */}
      <section className="py-6 sm:py-14">
        <div className="px-0 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative w-full rounded-none sm:rounded-[36px] overflow-hidden bg-[#182015] min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center shadow-none sm:shadow-2xl border-y sm:border border-white/10">
            
            {/* Background Botanical Image positioned on the right half */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/assets/images/wR5U1IySzFD4zIH5VADHSPmu1o.webp"
                alt="Eco-Friendly Skincare on Monstera Leaf"
                className="w-full h-full object-cover object-[75%_center] sm:object-right"
              />
              {/* Left Vignette & Gradient for ultra-clean text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#172013] via-[#172013]/90 sm:via-[#172013]/80 via-45% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172013]/70 via-transparent to-transparent sm:hidden" />
            </div>

            {/* Overlaid Editorial Content */}
            <div className="relative z-10 py-12 px-6 sm:p-14 lg:p-20 max-w-xl space-y-5 sm:space-y-6 text-white">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-[-0.03em]">
                <span className="text-white block">Eco-Friendly,</span>
                <span className="italic text-white/90 block">Skin-Friendly</span>
              </h2>

              <p className="text-sm sm:text-base text-white/85 font-body leading-relaxed max-w-md">
                100% natural means every ingredient is carefully selected from nature to provide safe, effective, and gentle care for your skin.
              </p>

              {/* 3 Outline Features */}
              <div className="space-y-3 pt-1 text-white">
                <div className="flex items-center gap-3 text-sm sm:text-[15px] text-white font-medium">
                  <Pipette className="w-4 h-4 text-white shrink-0" />
                  <span className="text-white">No Harsh Chemicals</span>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-[15px] text-white font-medium">
                  <Leaf className="w-4 h-4 text-white shrink-0" />
                  <span className="text-white">Plant-Based Goodness</span>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-[15px] text-white font-medium">
                  <Sparkles className="w-4 h-4 text-white shrink-0" />
                  <span className="text-white">Ethically Sourced</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. "WHY YOUR SKIN DESERVES THE BEST" (Exact Bento Grid from Landbook Screenshot) */}
      <section className="py-16 sm:py-28">
        <div className="kanva-container">
          
          {/* Section Heading & Social Proof Rating */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1a1c18] font-normal leading-[1.08] tracking-[-0.03em]">
                Why Your Skin <br />
                <span className="italic font-normal">Deserves the Best</span>
              </h2>
            </div>

            {/* Social Proof Rating Card with 3 Avatar Thumbnails */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start sm:items-end">
                <div className="flex gap-0.5 text-xs text-[#1a1c18]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#1a1c18] text-[#1a1c18]" />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#1a1c18]/70 mt-0.5 font-medium">4.9 (2,400+ reviews)</span>
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="/assets/images/xdCJPsYAb1YfHzQkXktdaxPWKQ.webp"
                  alt="Patron 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="/assets/images/WM2mkMIFXECzXRvcuyR2t35jE.webp"
                  alt="Patron 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="/assets/images/PNdaPwyuqKyTwxE0kTpxEaC8wE0.webp"
                  alt="Patron 3"
                />
              </div>
            </div>
          </div>

          {/* 3-Card Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            
            {/* Card 1: Tall Editorial Portrait (Left 6 Cols) */}
            <div className="lg:col-span-6 relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#e8e8e1] border border-[rgba(26,28,24,0.06)] shadow-xs group min-h-[380px] sm:min-h-[460px] lg:min-h-0 flex flex-col justify-end">
              <img
                src="/assets/images/r5OUYIwpZUeIh5LNk3XDju6XzU.webp"
                alt="Model with Skincare Bottle"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Bottom-Left Card (Exact Reference) */}
              <div className="relative z-10 m-4 sm:m-6 max-w-[270px] p-4 sm:p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full border border-[#1a1c18] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#1a1c18] stroke-[2.5]" />
                  </div>
                  <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#1a1c18]">Proven Effectiveness</span>
                </div>
                <p className="text-xs sm:text-[12.5px] text-[#1a1c18]/75 font-body leading-relaxed">
                  Every product is carefully crafted to meet the highest quality standards.
                </p>
              </div>
            </div>

            {/* Right Column: 2 Stacked Cards (Right 6 Cols) */}
            <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 justify-between">
              
              {/* Card 2: Light Card - Eco-Friendly Packaging */}
              <div className="p-6 sm:p-8 bg-[#eae6df] rounded-[24px] sm:rounded-[32px] border border-[rgba(26,28,24,0.06)] flex flex-row items-center justify-between gap-4 sm:gap-6 overflow-hidden relative shadow-xs flex-1">
                <div className="space-y-2 flex-1 max-w-[240px]">
                  {/* Recycle Icon */}
                  <div className="text-[#1a1c18] opacity-75">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
                      <path d="m14 16 3 3-3 3" />
                      <path d="M8.293 13.596 3.75 5.724a1.82 1.82 0 0 1 0-1.78 1.834 1.834 0 0 1 1.57-.884h8.36" />
                      <path d="m3 9 3-3-3-3" />
                      <path d="M17.5 4.5 19 7l-1.5 2.5" />
                    </svg>
                  </div>
                  
                  <h3 className="font-serif text-xl sm:text-3xl text-[#1a1c18] font-normal leading-tight pt-1">
                    Eco-Friendly <br />
                    <span className="italic">Packaging</span>
                  </h3>
                  
                  <p className="text-[13px] sm:text-sm text-[#1a1c18]/75 font-body leading-relaxed pt-1">
                    Eco-friendly materials designed to care for the planet as much as your skin.
                  </p>
                </div>

                <div className="w-24 sm:w-36 h-36 sm:h-48 shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/images/OuM3OZFPZJTwubdSXl9OM7PsUc.webp"
                    alt="Amber Glass Dropper Bottle"
                    className="h-full object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Card 3: Dark Green Card - 100% Natural, 100% You */}
              <div className="p-6 sm:p-8 bg-[#3c4433] text-white rounded-[24px] sm:rounded-[32px] border border-white/10 flex flex-row items-center justify-between gap-3 sm:gap-4 overflow-hidden relative shadow-xs flex-1">
                {/* Left Botanical Leaf Image */}
                <div className="w-24 sm:w-36 h-36 sm:h-48 shrink-0 flex items-end justify-start">
                  <img
                    src="/assets/images/51e9kGMQvtvIcZEQUda1STNUks.webp"
                    alt="Botanical Leaf Branch"
                    className="h-full object-contain object-bottom"
                  />
                </div>

                {/* Right Text Content */}
                <div className="space-y-2.5 sm:space-y-3 flex-1 pl-1 sm:pl-2">
                  <h3 className="font-serif text-xl sm:text-3xl text-white font-normal leading-tight">
                    100% Natural <br />
                    <span className="italic text-[#dac5a7]">100% You</span>
                  </h3>
                  
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] text-white/90 font-body">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5 text-[#dac5a7] shrink-0" />
                      <span>No Harsh Chemicals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5 text-[#dac5a7] shrink-0" />
                      <span>Plant-Based Goodness</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5 text-[#dac5a7] shrink-0" />
                      <span>Ethically Sourced</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. EDITORIAL TESTIMONIAL & 3D PACKAGING COMPOSITION (Exact 1:1 Reference Match) */}
      <section className="bg-[#f2f2ef] text-center relative overflow-hidden">
        <div className="kanva-container max-w-5xl relative z-10">
          
          {/* Top Overlapping Polaroid Thumbnails */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="relative w-24 h-18 flex items-center justify-center">
              {/* Back tilted card (Right) */}
              <div className="absolute right-0 w-12 h-15 sm:w-14 sm:h-17 bg-white rounded-xl shadow-md rotate-12 transform origin-center border border-black/5 overflow-hidden p-1.5 flex items-center justify-center">
                <img
                  src="/assets/images/OuM3OZFPZJTwubdSXl9OM7PsUc.webp"
                  alt="Packaging"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Front card (Left) */}
              <div className="relative z-10 w-12 h-15 sm:w-14 sm:h-17 bg-white rounded-xl shadow-lg -rotate-6 transform origin-center border border-black/5 overflow-hidden p-1.5 flex items-center justify-center">
                <img
                  src="/assets/images/kgUNYolMVd4DrZKxkAYYHJgc.webp"
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Testimonial Quote in Sentient Serif (Exact 3-Line & Italic Phrasing from Reference Image 1) */}
          <FramerReveal>
            <blockquote className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-[54px] text-[#1a1c18] font-normal leading-[1.32] sm:leading-[1.22] tracking-[-0.03em] max-w-4xl mx-auto px-4">
              <span>It feels </span>
              <span className="italic font-serif font-light">healthier, smoother & more</span>
              <br className="hidden sm:inline" />
              <span className="italic font-serif font-light"> radiant </span>
              <span>than ever. I love knowing I’m</span>
              <br className="hidden sm:inline" />
              <span> using something natural and effective!</span>
            </blockquote>
          </FramerReveal>

          {/* 5-Star Rating & Author Badge */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-1">
            {/* 5 Filled Charcoal/Olive Stars */}
            <div className="flex items-center gap-1 text-[#5f664a] mb-1.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-[#5f664a] text-[#5f664a]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <h3 className="font-sans font-medium text-base text-[#1a1c18]">
              Jennifer K.
            </h3>
            <p className="font-sans text-xs text-[#1a1c18]/50 font-normal">
              Verified Buyer
            </p>
          </div>

          {/* Floating 3D Packaging Composition with Exact Reference Product Cards */}
          <div className="mt-8 sm:mt-14 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg flex items-center justify-center py-4">
              
              {/* Main High-Res 3D Cream Tube and Box Render */}
              <img
                src="/assets/images/JRJZsP9IHUkxKa0YejeTEX8xPXY.png"
                alt="Used Cream Tube and Box Mockup"
                className="w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] object-contain drop-shadow-[0_20px_40px_rgba(26,28,24,0.18)]"
              />

              {/* Floating Product Callout Card 1 (Top-Left attached to Tube) */}
              <div className="absolute left-1 sm:left-4 lg:-left-2 top-[20%] sm:top-[24%] -translate-y-1/2 z-20 scale-95 sm:scale-100 origin-left">
                <div className="relative group cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(26,28,24,0.12)] border border-[rgba(26,28,24,0.06)] flex items-center gap-2.5 sm:gap-3 transition-all hover:scale-105 hover:shadow-2xl">
                  {/* Product Thumbnail */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f2f2ef] flex items-center justify-center p-1 shrink-0">
                    <img
                      src="/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png"
                      alt="Glow Milk"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="text-left pr-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold block">Lotions</span>
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#1a1c18] leading-tight">Glow Milk</h4>
                    <span className="text-xs font-mono text-[#1a1c18]/80 font-semibold block mt-0.5">₹799</span>
                  </div>
                </div>
              </div>

              {/* Hotspot Dot 2 on Tube */}
              <span className="absolute left-[54%] top-[78%] w-3 h-3 rounded-full bg-white ring-4 ring-white/30 shadow-md -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" />

              {/* Floating Product Callout Card 2 (Bottom-Right attached to Tube) */}
              <div className="absolute right-1 sm:right-4 lg:-right-2 top-[78%] -translate-y-1/2 z-20 scale-95 sm:scale-100 origin-right">
                <div className="relative group cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(26,28,24,0.12)] border border-[rgba(26,28,24,0.06)] flex items-center gap-2.5 sm:gap-3 transition-all hover:scale-105 hover:shadow-2xl">
                  {/* Product Thumbnail */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f2f2ef] flex items-center justify-center p-1 shrink-0">
                    <img
                      src="/assets/images/BMFhnFAhst9s63aVChnI9Cy1bsk.png"
                      alt="Daily Flow"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="text-left pr-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold block">Lotions</span>
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#1a1c18] leading-tight">Daily Flow</h4>
                    <span className="text-xs font-mono text-[#1a1c18]/80 font-semibold block mt-0.5">₹649</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. "STAY UPDATED, STAY RADIANT" NEWSLETTER BANNER (Exact 1-to-1 Clone with Reference) */}
      <section className="py-12 sm:py-16">
        <div className="kanva-container">
          <div className="relative bg-[#3c4433] text-white rounded-3xl sm:rounded-[36px] overflow-hidden p-6 sm:p-14 lg:p-16 border border-white/10 shadow-2xl min-h-[400px] sm:min-h-[460px] flex items-center">
            <BorderBeam size={260} duration={14} colorFrom="#dac5a7" colorTo="#757d5c" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10">
              
              {/* Left Newsletter Copy & Form */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-[56px] text-white font-normal leading-[1.08] tracking-[-0.03em]">
                  <span className="text-white block">Stay Updated,</span>
                  <span className="italic text-white/80 block">Stay Radiant</span>
                </h2>

                <p className="text-sm sm:text-base text-white/85 font-body leading-relaxed max-w-sm">
                  Be the first to know about new products, offers, and skincare tips.
                </p>

                {isSubscribed ? (
                  <div className="p-4 bg-white/10 rounded-2xl text-xs sm:text-sm font-mono text-[#dac5a7] flex items-center gap-2 max-w-sm">
                    <Check className="w-4 h-4 text-[#dac5a7]" />
                    <span>You are subscribed! Welcome dispatches will arrive in your inbox.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="relative flex flex-col sm:flex-row gap-2 sm:gap-0 bg-transparent sm:bg-white rounded-2xl sm:rounded-full p-0 sm:p-1.5 max-w-sm shadow-md">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full bg-white sm:bg-transparent rounded-full px-4 py-3 sm:py-2 text-sm text-[#1a1c18] placeholder-[#1a1c18]/50 focus:outline-none font-sans"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 sm:py-2.5 bg-[#757d5c] hover:bg-[#5f664a] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer shrink-0 shadow-sm"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Right 3-Layer Botanical Leaf & Amber Bottle Composition */}
              <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-96 w-full flex items-center justify-center overflow-visible">
                {/* Background Leaf Right (Rotated 22deg) */}
                <img
                  src="/assets/images/51e9kGMQvtvIcZEQUda1STNUks.webp"
                  alt="Botanical Leaf"
                  className="absolute right-0 sm:right-6 lg:right-8 top-1/2 -translate-y-[45%] w-40 sm:w-60 lg:w-72 object-contain rotate-[22deg] pointer-events-none drop-shadow-2xl opacity-95"
                />
                {/* Background Leaf Left (Rotated -29deg) */}
                <img
                  src="/assets/images/r5OUYIwpZUeIh5LNk3XDju6XzU.webp"
                  alt="Botanical Leaf"
                  className="absolute left-0 sm:left-8 lg:left-10 top-1/2 -translate-y-[40%] w-36 sm:w-56 lg:w-64 object-contain -rotate-[29deg] pointer-events-none drop-shadow-xl opacity-95"
                />
                {/* Front Center Amber Glass Pump Bottle */}
                <img
                  src="/assets/images/kgUNYolMVd4DrZKxkAYYHJgc.webp"
                  alt="Amber Glass Pump Bottle"
                  className="relative z-10 w-24 sm:w-36 lg:w-44 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transform -translate-y-2"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 9. "FOLLOW US 📸 INSTAGRAM" (Exact 5-Photo Gallery from Reference) */}
      <section className="py-16">
        <div className="kanva-container">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c18] font-normal inline-flex items-center gap-2">
              <span>Follow Us</span>
              <img
                src="/assets/images/WCTyNPKBDXsCpbWjuDNL9u64Im0.webp"
                alt="Instagram Icon"
                className="w-6 h-6 rounded-full object-cover shadow-xs"
              />
              <span className="italic text-[#2b3323]">Instagram</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#1a1c18]/70 mt-1.5 uppercase tracking-widest font-medium">
              @riyanshamrit.ayurveda • Botanical Skin Formulations
            </p>
          </div>

          {/* 5-Photo Gallery Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              '/assets/images/1KuCZRGMDTvgYstzArYLFbyMRF4.webp',
              '/assets/images/Zcj5hjQsZQibOYyMtNgwK0kYZMU.webp',
              '/assets/images/r5OUYIwpZUeIh5LNk3XDju6XzU.webp',
              '/assets/images/bggAgijHA8Z8EoqAIZbcXfXa8V4.webp',
              '/assets/images/IrT0kVST5QRN5Frzsc6jkoe6Ck.webp',
            ].map((imgUrl, idx) => (
              <a
                key={idx}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#e8e8e1] border border-[rgba(26,28,24,0.06)] block cursor-pointer shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`Kanva Instagram Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Instagram className="w-6 h-6 text-[#dac5a7]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <InteractiveDoshaQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
      <BotanicalHerbExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />

    </div>
  );
};
