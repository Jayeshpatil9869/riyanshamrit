import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { addToast } = useCommerce();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Welcome to the Riyansh Amrit Ayurvedic Gazette!', 'success');
  };

  return (
    <footer id="editorial-footer" className="w-full bg-[#1a1c18] text-[#efedfd] pt-20 pb-12 mt-20 border-t border-white/10">
      <div className="kanva-container">
        {/* 1. Large Brand Statement & Manifesto */}
        <div className="border-b border-white/10 pb-16">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#dac5a7] block mb-3">
              THE RIYANSH AMRIT PLEDGE • EST. 2019
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f2f2ef] font-normal leading-tight">
              Har Ghar Sehat, <br />
              <span className="italic text-[#dac5a7]">Har Ghar Rozgar.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-body leading-relaxed mt-4 max-w-2xl">
              Rooted in Sangamner, Maharashtra, Riyansh Multitrade honors ancient Charaka Samhita decoctions
              while maintaining state-of-the-art ISO 9001:2015 and GMP-certified botanical extraction.
              We deliver unadulterated Rasayana wellness to every conscious Indian household.
            </p>
          </div>

          {/* Newsletter Pill */}
          <div className="mt-8 max-w-md">
            <p className="text-xs font-mono tracking-widest uppercase text-white/50 mb-2">
              Receive Seasonal Ayurvedic Ritu-Charya Wisdom
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-full text-xs text-[#dac5a7]">
                <Check className="w-4 h-4 text-[#dac5a7]" />
                <span>You are subscribed. Seasonal wellness dispatches will arrive in your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-5 pr-32 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/15 focus:border-[#dac5a7] rounded-full text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-5 py-2 bg-[#dac5a7] hover:bg-white text-[#1a1c18] rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. Categorized Editorial Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-16 border-b border-white/10 text-xs">
          {/* Store Catalog */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#dac5a7]">
              Store
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/store" className="hover:text-white transition-colors">
                  All 20 Formulations
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-white transition-colors">
                  Featured Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-white transition-colors">
                  Classical Rasayanas
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-white transition-colors">
                  Herbal Decoctions & Syrups
                </Link>
              </li>
            </ul>
          </div>

          {/* Patron Commerce */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#dac5a7]">
              Patron Services
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/account/orders" className="hover:text-white transition-colors">
                  Track Orders & Invoices
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Formulations
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  Express Checkout
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Patron Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Heritage */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#dac5a7]">
              Heritage & Origin
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sangamner Origins (2019)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Ayurvedic Vaidya Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Direct Support & Locations
                </Link>
              </li>
              <li>
                <span className="text-white/40 block pt-1">
                  GMP Facility: Maharashtra
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#dac5a7]">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund" className="hover:text-white transition-colors">
                  Cancellation & 7-Day Refund
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy & Data Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Address & Certification Bar */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/60 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#dac5a7]" />
              <span>Riyansh Multitrade Pvt. Ltd., Sangamner, Ahmednagar, MH 422605</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#dac5a7]" />
              <a href="tel:+919822488300" className="hover:text-white">
                +91 98224 88300
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#dac5a7]" />
              <a href="mailto:support@riyanshamrit.com" className="hover:text-white">
                support@riyanshamrit.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[11px] font-mono text-[#dac5a7]">
              <ShieldCheck className="w-3.5 h-3.5" />
              ISO 9001:2015
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[11px] font-mono text-[#dac5a7]">
              GMP Standard
            </span>
          </div>
        </div>

        {/* 4. Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40 font-mono">
          <p>© {new Date().getFullYear()} Riyansh Multitrade Private Limited. All rights reserved.</p>
          <p className="text-center md:text-right max-w-md">
            *Ayurvedic proprietary formulations are based on classical texts. Statements not evaluated by US FDA. Not intended to diagnose or treat without qualified physician advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
