import React, { useRef } from 'react';
import { Link } from '../context/RouterContext';
import { motion, useScroll, useTransform } from 'framer-motion';

// Interactive Double Text Roll Component
function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      className="group inline-flex flex-col h-[1.3em] overflow-hidden text-[14px] sm:text-[14.5px] leading-[1.3em] no-underline self-center lg:self-start cursor-pointer text-center lg:text-left"
    >
      <span className="text-white/70 transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block font-normal">
        {label}
      </span>
      <span className="text-white font-medium transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block">
        {label}
      </span>
    </Link>
  );
}

export const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress when the footer window comes into view for the smooth parallax peel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 0.85, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto lg:h-[540px] bg-[#1a1c18] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
    >
      {/* Footer Content */}
      <footer
        id="editorial-footer"
        className="relative lg:fixed lg:bottom-0 lg:left-0 w-full lg:h-[540px] bg-[#1a1c18] text-white z-[1] flex flex-col justify-between pt-12 sm:pt-14 pb-8 sm:pb-10 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/5 select-none"
      >
        <motion.div
          style={{ opacity }}
          className="max-w-[1360px] w-full mx-auto flex flex-col justify-between h-full gap-6 lg:gap-8"
        >
          {/* Main Content Layout (Centered Stack on Mobile, 12-Col Grid on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* BRAND COLUMN (Description) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left justify-between gap-6 lg:gap-8">
              <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                  About Riyansh Amrit
                </h2>
                <p className="text-white/75 text-[14px] sm:text-[14.5px] leading-relaxed font-sans">
                  Combining nature and science, we create Ayurvedic formulations that nurture your vitality and respect the planet. Healthy, radiant living starts here.
                </p>
              </div>
            </div>

            {/* NAV LINKS (Centered Single-Column on Mobile, 3 Columns on Tablet/Desktop) */}
            <div className="lg:col-span-7 flex flex-col sm:grid sm:grid-cols-3 gap-8 sm:gap-10 text-center lg:text-left">
              
              {/* Pages Column */}
              <div className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-3">
                <h3 className="text-white font-medium text-base sm:text-[15px] mb-0.5 tracking-wide">
                  Pages
                </h3>
                <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                  <RollLink href="/" label="Home" />
                  <RollLink href="/about" label="About" />
                  <RollLink href="/store" label="Shop" />
                  <RollLink href="/products/hydrating-serum" label="Shop Single" />
                  <RollLink href="/about" label="Blog" />
                  <RollLink href="/about" label="Blog Single" />
                  <RollLink href="/orders/failure" label="404" />
                  <RollLink href="/terms" label="Licensing" />
                </nav>
              </div>

              {/* Categories & Account Column */}
              <div className="flex flex-col items-center lg:items-start gap-5 sm:gap-6">
                <div className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-3">
                  <h3 className="text-white font-medium text-base sm:text-[15px] mb-0.5 tracking-wide">
                    Categories
                  </h3>
                  <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                    <RollLink href="/store" label="All Products" />
                    <RollLink href="/store" label="Best Sellers" />
                    <RollLink href="/store" label="New Arrivals" />
                    <RollLink href="/store" label="Sale" />
                    <RollLink href="/store" label="Cleansers" />
                    <RollLink href="/store" label="Lotions" />
                    <RollLink href="/store" label="Moisturizers" />
                  </nav>
                </div>

                {/* Account Sub-Section */}
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <h3 className="font-serif italic text-white/95 text-lg sm:text-base font-light">
                    Account &amp; Orders
                  </h3>
                  <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                    <RollLink href="/account/profile" label="My Profile" />
                    <RollLink href="/account/orders" label="Order Tracking" />
                    <RollLink href="/wishlist" label="Saved Wishlist" />
                  </nav>
                </div>
              </div>

              {/* Support Column */}
              <div className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-3">
                <h3 className="text-white font-medium text-base sm:text-[15px] mb-0.5 tracking-wide">
                  Support
                </h3>
                <nav className="flex flex-col items-center lg:items-start gap-2 sm:gap-1.5">
                  <RollLink href="/contact" label="Contact" />
                  <RollLink href="/about" label="FAQs" />
                  <RollLink href="/shipping" label="Shipping & Delivery" />
                  <RollLink href="/cancellation-refund" label="Orders & Returns" />
                  <RollLink href="/terms" label="Terms & Conditions" />
                </nav>
              </div>

            </div>

          </div>

          {/* Bottom Bar (Credits & Links) */}
          <div className="pt-5 sm:pt-6 pb-2 sm:pb-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-white/75 text-[13px] sm:text-[13.5px] leading-relaxed">
              <span>Crafted by </span>
              <a
                href="https://divinescode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#dac5a7] hover:underline font-medium"
              >
                Divines Code
              </a>
              <span className="mx-2 text-white/40">•</span>
              <span>Designed and Developed by </span>
              <a
                href="https://jayeshbpatil.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#dac5a7] hover:underline font-medium"
              >
                Jayesh Patil
              </a>
              <span> &amp; </span>
              <a
                href="https://mahendranagpure.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#dac5a7] hover:underline font-medium"
              >
                Mahendra Nagpure
              </a>
            </div>

            <div className="text-white/45 text-xs font-mono">
              © {new Date().getFullYear()} Riyansh Amrit. All rights reserved.
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};
