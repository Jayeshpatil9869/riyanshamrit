import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { RIYANSH_PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BlurText } from '../components/motion/BlurText';
import { AnimatedTabs } from '../components/motion/AnimatedTabs';
import { Search, X, ArrowUpDown } from 'lucide-react';

export const StorePage: React.FC = () => {
  const { queryParams, navigate } = useRouter();

  const initialCat = queryParams.get('category') || 'All Products';
  const initialSearch = queryParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller'>('featured');

  useEffect(() => {
    const cat = queryParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = queryParams.get('search');
    if (search) setSearchQuery(search);
  }, [queryParams]);

  const filteredProducts = useMemo(() => {
    return RIYANSH_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesIng = product.ingredients.some(
          (i) => i.name.toLowerCase().includes(q) || (i.botanicalName && i.botanicalName.toLowerCase().includes(q))
        );
        if (!matchesName && !matchesDesc && !matchesIng) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All Products');
    setSearchQuery('');
    setSortBy('featured');
    navigate('/store');
  };

  const hasActiveFilters =
    selectedCategory !== 'All Products' ||
    searchQuery.trim().length > 0;

  return (
    <div className="w-full pt-6 pb-20">
      <div className="kanva-container">
        {/* Editorial Header */}
        <div className="pt-6 pb-10 sm:py-12 border-b border-[rgba(26,28,24,0.08)]">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-3">
              THE SANGAMNER APOTHECARY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1a1c18] font-normal tracking-[-0.03em] leading-[1.08]">
              <span>Complete Skincare </span>
              <span className="italic font-normal text-[#3c4433]">Formulations</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1c18]/70 font-body max-w-2xl mt-4 leading-relaxed">
              Pure, clean, and organic botanicals formulated to provide gentle, effective care for healthy, radiant skin.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar (Kanva Integrated Minimalist Style) */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[rgba(26,28,24,0.08)]">
          {/* Categories Pill Scroller with AnimatedTabs */}
          <div className="overflow-x-auto no-scrollbar py-1">
            <AnimatedTabs
              tabs={CATEGORIES.map((c) => ({
                id: c,
                label: c,
                count: c === 'All Products' ? RIYANSH_PRODUCTS.length : RIYANSH_PRODUCTS.filter((p) => p.category === c).length
              }))}
              activeTab={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herbs or products..."
                className="w-full pl-9 pr-8 py-2.5 bg-white text-xs text-[#1a1c18] placeholder-[#1a1c18]/40 border border-[rgba(26,28,24,0.1)] rounded-full focus:outline-none focus:border-[#1a1c18] shadow-2xs transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1a1c18]/40 hover:text-[#1a1c18] p-0.5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-white border border-[rgba(26,28,24,0.1)] rounded-full px-3.5 py-2 text-xs text-[#1a1c18] shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 opacity-60 mr-1.5 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Sort: Featured</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="pt-4 flex items-center flex-wrap gap-2 text-xs">
            <span className="text-[#1a1c18]/50 font-mono text-[11px] uppercase">Active:</span>
            {selectedCategory !== 'All Products' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dac5a7]/30 text-[#1a1c18] rounded-full text-[11px]">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All Products')} className="opacity-60 hover:opacity-100">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dac5a7]/30 text-[#1a1c18] rounded-full text-[11px]">
                “{searchQuery}”
                <button onClick={() => setSearchQuery('')} className="opacity-60 hover:opacity-100">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-[#3c4433] underline underline-offset-4 ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Count Indicator */}
        <div className="pt-6 pb-4 flex items-center justify-between text-xs text-[#1a1c18]/60">
          <span className="font-mono">
            Showing {filteredProducts.length} of {RIYANSH_PRODUCTS.length} authentic formulations
          </span>
          <span className="text-[11px] font-mono text-[#757d5c]">
            GMP Quality Verified • Direct from Sangamner
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-2xl border border-[rgba(26,28,24,0.06)] my-6 p-8">
            <div className="w-12 h-12 rounded-full bg-[#f2f2ef] flex items-center justify-center mx-auto text-xl font-serif text-[#1a1c18]/40">
              ∅
            </div>
            <h3 className="font-serif text-2xl text-[#1a1c18]">No Formulations Match Your Criteria</h3>
            <p className="text-xs text-[#1a1c18]/60 max-w-sm mx-auto">
              We couldn’t find any products with your chosen filters. Try resetting the category or searching for broader terms like “Juice” or “Joint”.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#1a1c18] text-[#f2f2ef] rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
