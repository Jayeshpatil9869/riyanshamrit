import React from 'react';
import { useRouter } from '../context/RouterContext';
import { FramerReveal } from '../components/motion/FramerReveal';
import {
  Leaf,
  Heart,
  ShieldCheck,
  Truck,
  Check,
  Star
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full pt-4 pb-20">
      
      {/* 1. HERO BANNER: "REDEFINING SKINCARE" (Full-Bleed Dark Green Hero Card) */}
      <section className="py-6 sm:py-10">
        <div className="kanva-container">
          <div className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#182015] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center shadow-2xl border border-white/10">
            
            {/* Background Botanical Mockup Image positioned on right */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/assets/images/wR5U1IySzFD4zIH5VADHSPmu1o.webp"
                alt="Redefining Skincare Botanical Mockup"
                className="w-full h-full object-cover object-[75%_center] sm:object-right"
              />
              {/* Vignette & Gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#172013] via-[#172013]/90 sm:via-[#172013]/80 via-45% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172013]/80 via-transparent to-transparent sm:hidden" />
            </div>

            {/* Overlaid Editorial Typography */}
            <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl space-y-6">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white font-normal leading-[0.96] tracking-[-0.035em]">
                <span className="text-white block">Redefining</span>
                <span className="italic text-white/80 block font-normal">Skincare</span>
              </h1>

              <p className="text-sm sm:text-base text-white/75 font-body leading-relaxed max-w-md pt-2">
                At Riyansh Amrit, we blend nature and science to create skincare that transforms skin health and respects the planet.
              </p>
            </div>

            {/* Bottom-right subtle badge */}
            <div className="absolute bottom-6 right-8 hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50">
              <span>Our Story</span>
              <span>•</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 4 IMPACT STATISTICS CARDS (Floating Row) */}
      <section className="relative -mt-6 sm:-mt-10 z-20">
        <div className="kanva-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Stat 1 */}
            <div className="p-6 sm:p-7 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_8px_24px_rgba(26,28,24,0.04)] text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl text-[#1a1c18] font-semibold block tracking-tight">
                98%
              </span>
              <h3 className="font-serif text-base sm:text-lg text-[#1a1c18] font-medium">
                Natural Ingredients
              </h3>
              <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                Sustainably sourced, pure botanical extracts.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-6 sm:p-7 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_8px_24px_rgba(26,28,24,0.04)] text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl text-[#1a1c18] font-semibold block tracking-tight">
                48k
              </span>
              <h3 className="font-serif text-base sm:text-lg text-[#1a1c18] font-medium">
                Customers Served
              </h3>
              <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                Trusted by skincare lovers across 30+ countries.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-6 sm:p-7 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_8px_24px_rgba(26,28,24,0.04)] text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl text-[#1a1c18] font-semibold block tracking-tight">
                42k
              </span>
              <h3 className="font-serif text-base sm:text-lg text-[#1a1c18] font-medium">
                Eco-Packaging
              </h3>
              <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                100% recyclable and eco-friendly packaging.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="p-6 sm:p-7 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_8px_24px_rgba(26,28,24,0.04)] text-center space-y-2">
              <span className="font-mono text-3xl sm:text-4xl text-[#1a1c18] font-semibold block tracking-tight">
                610
              </span>
              <h3 className="font-serif text-base sm:text-lg text-[#1a1c18] font-medium">
                Trees Planted 1%
              </h3>
              <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                Every order gives back to reforestation initiatives.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "DRIVEN BY CARE, ROOTED IN NATURE" (2x2 Editorial Bento Grid) */}
      <section className="py-20 sm:py-28">
        <div className="kanva-container">
          
          {/* Header row with Title & Rating Pill */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1c18] font-normal leading-[1.08] tracking-[-0.03em]">
                Driven by Care <br />
                <span className="italic font-normal text-[#3c4433]">Rooted in Nature</span>
              </h2>
            </div>

            {/* Rating pill with avatars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <img
                  src="/assets/images/4iafdgACHcW5wcIV5yf3JfXO8.webp"
                  alt="Reviewer 1"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/assets/images/xdCJPsYAb1YfHzQkXktdaxPWKQ.webp"
                  alt="Reviewer 2"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/assets/images/WM2mkMIFXECzXRvcuyR2t35jE.webp"
                  alt="Reviewer 3"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#d99b26] text-[#d99b26]" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-[#1a1c18]/70 block mt-0.5">
                  Award 4.9/5 Rating
                </span>
              </div>
            </div>
          </div>

          {/* 2x2 Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Bento 1: Tall Model Portrait Photo */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/4] sm:aspect-[4/5] bg-[#e8e8e1] shadow-md border border-[rgba(26,28,24,0.06)]">
              <img
                src="/assets/images/aklD6iOVbwu9dQ40Ny45JuNJAI.webp"
                alt="Model with Wildflowers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bento 2: Simple Rituals Powerful Results */}
            <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] bg-[#f2f2ef] px-3 py-1 rounded-full inline-block font-semibold">
                  OUR MISSION
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal leading-snug">
                  Simple Rituals <br />
                  <span className="italic font-normal text-[#3c4433]">Powerful Results</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#1a1c18]/70 font-body leading-relaxed">
                  We believe skincare should be an unhurried, effective ritual. Every formula is crafted with high-potency actives that work in harmony with your skin's natural biology.
                </p>
              </div>

              {/* 3 Check bullets */}
              <div className="space-y-3 pt-2 border-t border-[rgba(26,28,24,0.06)]">
                <div className="flex items-center gap-2.5 text-xs text-[#1a1c18]/85 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#757d5c]/15 text-[#757d5c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>100% Organic Botanical Actives</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1a1c18]/85 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#757d5c]/15 text-[#757d5c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>No Synthetic Additives</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1a1c18]/85 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#757d5c]/15 text-[#757d5c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Cruelty-Free Formulations</span>
                </div>
              </div>
            </div>

            {/* Bento 3: Why Your Skin Deserves the Best */}
            <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] bg-[#f2f2ef] px-3 py-1 rounded-full inline-block font-semibold">
                  OUR PROMISE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal leading-snug">
                  Why Your Skin <br />
                  <span className="italic font-normal text-[#3c4433]">Deserves the Best</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#1a1c18]/70 font-body leading-relaxed">
                  Our uncompromising commitment to purity means we source only ethically wild-harvested and cold-pressed botanicals without harsh preservatives or fillers.
                </p>
              </div>

              {/* 3 Check bullets */}
              <div className="space-y-3 pt-2 border-t border-[rgba(26,28,24,0.06)]">
                <div className="flex items-center gap-2.5 text-xs text-[#1a1c18]/85 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#757d5c]/15 text-[#757d5c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Zero Harsh Chemicals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1a1c18]/85 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#757d5c]/15 text-[#757d5c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Clinically Proven Ingredients</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1a1c18]/85 font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#757d5c]/15 text-[#757d5c] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>Direct Extraction Quality</span>
                </div>
              </div>
            </div>

            {/* Bento 4: Landscape Bottles Photo */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/4] sm:aspect-[4/3] bg-[#e8e8e1] shadow-md border border-[rgba(26,28,24,0.06)]">
              <img
                src="/assets/images/zX8aQ5tVVxYfX6IugdYlTIF6plo.jpg"
                alt="Two green botanical pump bottles with dried wheat"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. EDITORIAL MANIFESTO / PHILOSOPHY STATEMENT */}
      <section className="py-20 sm:py-28 text-center bg-[#f2f2ef] relative">
        <div className="kanva-container max-w-4xl">
          
          {/* Avatar Thumbnail Icon */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/images/4iafdgACHcW5wcIV5yf3JfXO8.webp"
              alt="Brand Philosophy"
              className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-[#dac5a7]"
            />
          </div>

          <FramerReveal>
            <blockquote className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1a1c18] font-normal leading-[1.25] tracking-[-0.03em] max-w-3xl mx-auto">
              Natural Beauty. <br />
              Sustainable Future. <br />
              <span className="italic font-normal text-[#3c4433] inline-flex items-center gap-2 justify-center flex-wrap">
                Effective Skincare.
                <img
                  src="/assets/images/leaf-botanical.png"
                  alt="botanical leaf"
                  className="inline-block w-9 h-9 sm:w-12 sm:h-12 object-contain align-middle -mt-1 drop-shadow-xs"
                />
              </span>
            </blockquote>
          </FramerReveal>

          <p className="font-mono text-xs text-[#1a1c18]/50 uppercase tracking-[0.2em] mt-6">
            Our Philosophy
          </p>
        </div>
      </section>

      {/* 5. SUSTAINABILITY & QUALITY (Full-Bleed Dark Green Hero Card) */}
      <section className="py-16 sm:py-24">
        <div className="kanva-container">
          <div className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#182015] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center shadow-2xl border border-white/10">
            
            {/* Background Metal Tin Mockup Image positioned on right */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/assets/images/OuM3OZFPZJTwubdSXl9OM7PsUc.webp"
                alt="Sustainability and Quality Metal Packaging Mockup"
                className="w-full h-full object-cover object-[75%_center] sm:object-right"
              />
              {/* Dark Gradient overlay on left for typography readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#172013] via-[#172013]/90 sm:via-[#172013]/80 via-45% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172013]/80 via-transparent to-transparent sm:hidden" />
            </div>

            {/* Left-Aligned Editorial Text Content */}
            <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl space-y-6">
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.02] tracking-[-0.03em]">
                <span className="text-white block">Sustainability</span>
                <span className="italic text-white/80 block font-normal">&amp; Quality</span>
              </h2>

              <p className="text-sm sm:text-base text-white/75 font-body leading-relaxed max-w-md pt-2">
                Every product is made with 100% natural, ethically sourced ingredients to protect both your skin and our planet.
              </p>

              {/* 3 Check items with check marks */}
              <div className="space-y-3 pt-4 text-white/90">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Zero Toxic Additives</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Cruelty-Free Always</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ECO-FRIENDLY PACKAGING (Left: 3-bottle family packaging, Right: Copy & 2x2 grid of 4 cards) */}
      <section className="py-16 sm:py-24">
        <div className="kanva-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left 5 cols: 3-bottle family packaging mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden bg-[#e8e8e1]/50 p-6 flex items-center justify-center">
                <img
                  src="/assets/images/IrT0kVST5QRN5Frzsc6jkoe6Ck.webp"
                  alt="Eco-Friendly Skincare Packaging Bottles"
                  className="w-full h-auto object-contain max-h-[500px] drop-shadow-xl"
                />
              </div>
            </div>

            {/* Right 7 cols: Copy and 2x2 Micro Cards Grid */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1c18] font-normal leading-[1.08] tracking-[-0.03em]">
                  Eco-Friendly <br />
                  <span className="italic font-normal text-[#3c4433]">Packaging</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#1a1c18]/70 font-body leading-relaxed max-w-xl mt-4">
                  At Riyansh Amrit, we provide luxurious, clean skincare that makes your daily routine feel good for you and the planet. Our products are made with 100% pure ingredients.
                </p>
              </div>

              {/* 2x2 Micro-cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Micro-card 1 */}
                <div className="p-6 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_4px_16px_rgba(26,28,24,0.03)] space-y-2 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#f2f2ef] flex items-center justify-center text-[#757d5c] mx-auto mb-3">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base text-[#1a1c18] font-medium">
                    Natural Formula
                  </h4>
                  <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                    Detailed info on the active ingredients used in formula.
                  </p>
                </div>

                {/* Micro-card 2 */}
                <div className="p-6 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_4px_16px_rgba(26,28,24,0.03)] space-y-2 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#f2f2ef] flex items-center justify-center text-[#757d5c] mx-auto mb-3">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base text-[#1a1c18] font-medium">
                    Cruelty-Free
                  </h4>
                  <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                    Our products are certified 100% cruelty-free &amp; vegan.
                  </p>
                </div>

                {/* Micro-card 3 */}
                <div className="p-6 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_4px_16px_rgba(26,28,24,0.03)] space-y-2 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#f2f2ef] flex items-center justify-center text-[#757d5c] mx-auto mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base text-[#1a1c18] font-medium">
                    Expert-Approved
                  </h4>
                  <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                    Dermatologist-tested safe for sensitive skin.
                  </p>
                </div>

                {/* Micro-card 4 */}
                <div className="p-6 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-[0_4px_16px_rgba(26,28,24,0.03)] space-y-2 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#f2f2ef] flex items-center justify-center text-[#757d5c] mx-auto mb-3">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base text-[#1a1c18] font-medium">
                    Free Shipping
                  </h4>
                  <p className="text-xs text-[#1a1c18]/65 font-body leading-relaxed">
                    Enjoy free standard express shipping on all orders.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOLLOW ON INSTAGRAM (Title with avatar + 5 photo gallery grid) */}
      <section className="py-16 sm:py-24 border-t border-[rgba(26,28,24,0.06)]">
        <div className="kanva-container">
          
          {/* Section Heading */}
          <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal flex items-center gap-3">
              <span>Follow On</span>
              <img
                src="/assets/images/4iafdgACHcW5wcIV5yf3JfXO8.webp"
                alt="Instagram Avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-[#dac5a7]"
              />
              <span className="italic text-[#3c4433]">Instagram</span>
            </h2>
          </div>

          {/* 5 Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            
            {/* Photo 1: Monstera leaves */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#e8e8e1] group relative cursor-pointer">
              <img
                src="/assets/images/bggAgijHA8Z8EoqAIZbcXfXa8V4.webp"
                alt="Instagram Post 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Photo 2: Face serum close up */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#e8e8e1] group relative cursor-pointer">
              <img
                src="/assets/images/vAsQUc57V7vQ6L24k7FTe2aAk0g.webp"
                alt="Instagram Post 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Photo 3: Amber bottle leaf */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#e8e8e1] group relative cursor-pointer">
              <img
                src="/assets/images/wR5U1IySzFD4zIH5VADHSPmu1o.webp"
                alt="Instagram Post 3"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Photo 4: Model with wildflowers */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#e8e8e1] group relative cursor-pointer">
              <img
                src="/assets/images/aklD6iOVbwu9dQ40Ny45JuNJAI.webp"
                alt="Instagram Post 4"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Photo 5: Botanical product jar & applicator on stone */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#e8e8e1] group relative cursor-pointer col-span-2 sm:col-span-1">
              <img
                src="/assets/images/FOuPvHslEnF6yPKiIgLeU0vNY90.webp"
                alt="Instagram Post 5"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
