import React, { useRef } from 'react';
import { Link } from '../context/RouterContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';

// Interactive Double Text Roll Component
function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      className="group inline-flex flex-col h-[1.35em] overflow-hidden text-[15.5px] sm:text-[14.5px] leading-[1.35em] no-underline self-center lg:self-start cursor-pointer text-center lg:text-left py-0.5 sm:py-0"
    >
      <span className="text-white/75 sm:text-white/70 transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block font-normal">
        {label}
      </span>
      <span className="text-[#dac5a7] font-medium transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full block">
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
      className="relative w-full h-auto lg:min-h-[480px] bg-[#1a1c18] lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
    >
      {/* Footer Content with Parallax Curtain Peel Animation */}
      <footer
        id="editorial-footer"
        className="relative lg:fixed lg:bottom-0 lg:left-0 w-full lg:min-h-[480px] bg-[#1a1c18] text-white z-[1] flex flex-col justify-between pt-12 sm:pt-14 pb-6 sm:pb-8 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/5 select-none"
      >
        <motion.div
          style={{ opacity }}
          className="max-w-[1360px] w-full mx-auto flex flex-col justify-between h-full gap-8 lg:gap-10"
        >
          {/* Main 4-Column Professional Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-2">
            
            {/* COLUMN 1: BRAND IDENTITY & SOCIALS (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left gap-5">
              {/* Brand Logo */}
              <Link to="/" className="group flex flex-col items-center lg:items-start select-none">
                <span className="font-serif text-[26px] sm:text-[28px] lg:text-[30px] tracking-[-0.03em] font-normal uppercase text-white transition-opacity group-hover:opacity-85">
                  RIYANSH AMRIT
                </span>
                <span className="text-[11px] tracking-[0.25em] uppercase font-sans font-semibold text-[#dac5a7] mt-0.5">
                  Ayurvedic Wellness
                </span>
              </Link>

              <p className="text-white/80 sm:text-white/70 text-[14.5px] leading-relaxed font-sans max-w-sm">
                Authentic Ayurvedic juices and herbal supplements from Maharashtra — immunity, joints, digestion, and vitality, delivered across India.
              </p>

              {/* Social Media Links */}
              <div className="flex flex-col items-center lg:items-start gap-2.5 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#dac5a7]/80 font-semibold">
                  Follow Us
                </span>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#dac5a7] hover:bg-white/10 hover:border-[#dac5a7]/40 transition-all cursor-pointer shadow-xs"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* COLUMN 2: QUICK LINKS (2.5 cols) */}
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-3.5 text-center lg:text-left">
              <h3 className="font-serif text-xl sm:text-lg text-white font-normal tracking-wide">
                Quick Links
              </h3>
              <nav className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-2">
                <RollLink href="/" label="Home" />
                <RollLink href="/store" label="Shop All Products" />
                <RollLink href="/about" label="About Us" />
                <RollLink href="/wishlist" label="Saved Wishlist" />
                <RollLink href="/cart" label="Shopping Bag" />
                <RollLink href="/contact" label="Contact & Support" />
              </nav>
            </div>

            {/* COLUMN 3: CUSTOMER SERVICE (2.5 cols) */}
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-3.5 text-center lg:text-left">
              <h3 className="font-serif text-xl sm:text-lg text-white font-normal tracking-wide">
                Customer Service
              </h3>
              <nav className="flex flex-col items-center lg:items-start gap-2.5 sm:gap-2">
                <RollLink href="/shipping" label="Shipping Policy" />
                <RollLink href="/cancellation-refund" label="Returns & Refunds" />
                <RollLink href="/privacy" label="Privacy Policy" />
                <RollLink href="/terms" label="Terms & Conditions" />
                <RollLink href="/account/profile" label="My Account Profile" />
                <RollLink href="/account/orders" label="Order Tracking" />
              </nav>
            </div>

            {/* COLUMN 4: CONTACT US (3 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
              <h3 className="font-serif text-xl sm:text-lg text-white font-normal tracking-wide">
                Contact Us
              </h3>
              
              {/* Contact Info List */}
              <div className="flex flex-col items-center lg:items-start gap-3 text-[14px] text-white/80 leading-relaxed font-sans w-full">
                {/* Address */}
                <div className="flex items-start gap-2.5 text-center lg:text-left">
                  <MapPin className="w-4 h-4 text-[#dac5a7] shrink-0 mt-1 hidden sm:block" />
                  <span>
                    Jijamata Pride, Sangamner / Malegaon, Maharashtra, 422608, India
                  </span>
                </div>

                {/* Phone */}
                <a
                  href="tel:+918605911293"
                  className="flex items-center gap-2.5 text-white/80 hover:text-[#dac5a7] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#dac5a7] shrink-0 hidden sm:block" />
                  <span>+91 8605911293</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:riyanshamrit106@gmail.com"
                  className="flex items-center gap-2.5 text-white/80 hover:text-[#dac5a7] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#dac5a7] shrink-0 hidden sm:block" />
                  <span>riyanshamrit106@gmail.com</span>
                </a>

                {/* Operating Hours */}
                <div className="flex items-center gap-2.5 text-white/70 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#dac5a7] shrink-0 hidden sm:block" />
                  <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar (Credits) */}
          <div className="pt-5 pb-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            {/* Left: Copyright & Crafted by */}
            <div className="text-white/70 text-xs sm:text-[13px] leading-relaxed">
              <span>© {new Date().getFullYear()} Riyansh Amrit • Crafted by </span>
              <a
                href="https://divinescode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#dac5a7] hover:underline font-medium"
              >
                Divines Code
              </a>
            </div>

            {/* Right: Designed and Developed by */}
            <div className="text-white/70 text-xs sm:text-[13px] leading-relaxed">
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
          </div>
        </motion.div>
      </footer>
    </div>
  );
};
