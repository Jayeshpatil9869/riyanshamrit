import React, { useState, useEffect, useRef } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { useRouter } from '../context/RouterContext';
import { RIYANSH_PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, formatPrice, addToCart } = useCommerce();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularQueries = [
    'Amrit Juice',
    'Shilajit',
    'Artho-G',
    'Hair Oil',
    'Neem Soap',
    'Diabetes',
    'Immunity'
  ];

  const results: Product[] = query.trim()
    ? RIYANSH_PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.healthConcern.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              (i.botanicalName && i.botanicalName.toLowerCase().includes(q))
          )
        );
      })
    : [];

  const handleProductSelect = (product: Product) => {
    setIsSearchOpen(false);
    navigate(`/products/${product.slug}`);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-start pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        id="search-backdrop"
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-[#1a1c18]/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Search Container */}
      <div
        id="search-modal-container"
        className="relative w-full max-w-2xl bg-[#f2f2ef] rounded-2xl shadow-[0_24px_60px_rgba(26,28,24,0.3)] border border-[rgba(26,28,24,0.12)] overflow-hidden z-10 flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[rgba(26,28,24,0.08)] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1a1c18]/40 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by herb, formulation name, or health concern..."
            className="w-full text-sm sm:text-base text-[#1a1c18] placeholder-[#1a1c18]/40 bg-transparent focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#1a1c18]/40 hover:text-[#1a1c18] text-xs font-mono"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 hover:bg-black/5 rounded-full text-[#1a1c18]/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto p-5 space-y-4">
          {!query.trim() ? (
            <div>
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#1a1c18]/40 mb-3">
                Trending Ayurvedic Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-white hover:bg-[#e8e8e1] border border-[rgba(26,28,24,0.08)] text-xs text-[#1a1c18] rounded-full transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[rgba(26,28,24,0.06)]">
                <p className="text-[11px] font-mono tracking-widest uppercase text-[#1a1c18]/40 mb-3">
                  Signature Rasayanas
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {RIYANSH_PRODUCTS.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="flex items-center gap-3 p-2.5 bg-white hover:bg-[#e8e8e1] rounded-xl border border-[rgba(26,28,24,0.06)] cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#f2f2ef]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-medium text-[#1a1c18] truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] font-mono text-[#757d5c]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#1a1c18]/60 space-y-2">
              <p className="font-serif text-base text-[#1a1c18]">No formulations match “{query}”</p>
              <p>Try searching for terms like “Amla”, “Joint”, “Soap”, “Shilajit” or “Capsules”.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#1a1c18]/40 mb-2">
                Found {results.length} formulation{results.length > 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-white hover:bg-white/80 rounded-xl border border-[rgba(26,28,24,0.06)] transition-all group"
                >
                  <div
                    onClick={() => handleProductSelect(product)}
                    className="flex items-center gap-3.5 flex-1 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-[#f2f2ef] flex-shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono uppercase text-[#757d5c] tracking-wider block">
                        {product.healthConcern}
                      </span>
                      <h4 className="text-xs sm:text-sm font-medium text-[#1a1c18] truncate group-hover:text-[#3c4433] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#1a1c18]/60 mt-0.5">
                        <strong className="text-[#1a1c18]">{formatPrice(product.price)}</strong>{' '}
                        <span className="line-through opacity-60">{formatPrice(product.compareAtPrice)}</span> • {product.volume}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3 py-1.5 bg-[#3c4433] hover:bg-[#1a1c18] text-white rounded-full text-xs font-medium transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => handleProductSelect(product)}
                      className="p-2 text-[#1a1c18]/40 hover:text-[#1a1c18]"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
