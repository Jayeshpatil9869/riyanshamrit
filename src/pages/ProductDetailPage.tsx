import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { SAMPLE_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ShimmerButton } from '../components/ui/ShimmerButton';
import { BorderBeam } from '../components/ui/BorderBeam';
import { BotanicalHerbExplorer } from '../components/ui/BotanicalHerbExplorer';
import {
  Star,
  Check,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Share2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  Award,
  Truck,
  Microscope
} from 'lucide-react';
import { Product, Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { productSlug, navigate } = useRouter();
  const {
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToast
  } = useCommerce();

  const product = products.find((p) => p.slug === productSlug) || products[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'benefits' | 'dosage' | 'reviews'>('ingredients');
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  // Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState<Review[]>(SAMPLE_REVIEWS);

  const isWish = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Formulation link copied to clipboard!', 'info');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verified: true,
      location: 'India'
    };
    setCustomReviews([newRev, ...customReviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    addToast('Thank you for sharing your Ayurvedic feedback!', 'success');
  };

  // Related products
  const relatedProducts = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="kanva-container">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#1a1c18]/50 py-4 font-mono">
          <Link to="/" className="hover:text-[#1a1c18]">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/store" className="hover:text-[#1a1c18]">
            Store
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1a1c18] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main PDP Grid (Kanva Large Gallery + Product Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4">
          {/* Left: Product Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/4] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#e8e8e1] border border-[rgba(26,28,24,0.06)] shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />

              {product.tag && (
                <div className="absolute top-5 left-5">
                  <span className="px-3.5 py-1.5 bg-[#1a1c18] text-[#dac5a7] rounded-full text-xs font-mono uppercase tracking-wider font-semibold shadow-xs">
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md transition-colors ${
                  isWish
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'bg-white/80 text-[#1a1c18]/70 hover:text-[#1a1c18] hover:bg-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[product.image, product.hoverImage, ...(product.gallery || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#e8e8e1] border-2 transition-all flex-shrink-0 ${
                    activeImage === img
                      ? 'border-[#3c4433] scale-95 shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Quality Assurance Strip */}
            <div className="p-4 bg-white rounded-2xl border border-[rgba(26,28,24,0.06)] grid grid-cols-3 gap-3 text-center text-xs">
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#757d5c]" />
                <span className="font-medium text-[#1a1c18] block text-[11px]">ISO 9001:2015</span>
                <span className="text-[10px] text-[#1a1c18]/50">Quality Assured</span>
              </div>
              <div className="space-y-1">
                <Award className="w-4 h-4 mx-auto text-[#757d5c]" />
                <span className="font-medium text-[#1a1c18] block text-[11px]">GMP Certified</span>
                <span className="text-[10px] text-[#1a1c18]/50">Classical Vidhi</span>
              </div>
              <div className="space-y-1">
                <Truck className="w-4 h-4 mx-auto text-[#757d5c]" />
                <span className="font-medium text-[#1a1c18] block text-[11px]">Direct Dispatch</span>
                <span className="text-[10px] text-[#1a1c18]/50">From Sangamner</span>
              </div>
            </div>
          </div>

          {/* Right: Product Commerce Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#757d5c] font-semibold">
                  {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-[#1a1c18]/60 hover:text-[#1a1c18] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">Share</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#1a1c18]/65 font-body mt-2">
                {product.tagline}
              </p>

              {/* Rating & SKU */}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[rgba(26,28,24,0.06)] text-xs text-[#1a1c18]/60">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#dac5a7] text-[#dac5a7]" />
                    ))}
                  </div>
                  <span className="font-mono font-medium text-[#1a1c18]">{product.rating}</span>
                  <span className="text-[11px]">({product.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <span className="font-mono text-[11px] uppercase">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="p-4 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#1a1c18]/40 block mb-0.5">
                  Special Offer Price (Incl. of all taxes)
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1a1c18]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-mono text-sm text-[#1a1c18]/40 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-[11px] font-mono bg-[#757d5c]/15 text-[#3c4433] px-2 py-0.5 rounded font-semibold">
                      SAVE {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 mr-1.5 align-middle" />
                <span className="text-xs font-medium text-[#3c4433]">In Stock</span>
              </div>
            </div>

            {/* Volume / Size Selection */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#1a1c18]/60 font-semibold block">
                Standard Volume / Pack Size:
              </span>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#3c4433] text-xs font-mono font-semibold text-[#3c4433] shadow-xs">
                <span>{product.volume}</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Description Snippet */}
            <p className="text-xs sm:text-sm text-[#1a1c18]/75 font-body leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & CTA Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[rgba(26,28,24,0.18)] rounded-full px-3 py-2 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-1.5 text-sm text-[#1a1c18]/60 hover:text-[#1a1c18] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-1.5 text-sm text-[#1a1c18]/60 hover:text-[#1a1c18] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="pdp-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-5 bg-white hover:bg-[#f2f2ef] text-[#1a1c18] border border-[rgba(26,28,24,0.22)] rounded-full text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#757d5c]" />
                  <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                </button>
              </div>

              {/* Instant Buy Now Button with ShimmerButton */}
              <ShimmerButton
                id="pdp-buy-now"
                onClick={handleBuyNow}
                background="#1a1c18"
                shimmerColor="#dac5a7"
                className="w-full !py-4 !px-6 !text-xs font-mono uppercase tracking-widest shadow-xl"
              >
                <span>Express Checkout (Buy Now)</span>
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>
            </div>

            {/* Shipping & Delivery reassurance */}
            <div className="p-4 bg-[#e8e8e1] rounded-2xl text-xs space-y-1.5 text-[#1a1c18]/70">
              <p className="flex items-center gap-2 text-[#1a1c18] font-medium">
                <Sparkles className="w-4 h-4 text-[#757d5c]" />
                <span>Complimentary Shipping on orders above ₹999</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Dispatches from Sangamner, Maharashtra within 24 hours. Sealed in pharmaceutical-grade UV-protective amber glass or food-safe HDPE containers.
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information Section (Kanva Clean Tabs) */}
        <div className="mt-20 pt-10 border-t border-[rgba(26,28,24,0.08)]">
          {/* Tabs header */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-[rgba(26,28,24,0.08)] overflow-x-auto no-scrollbar pb-3">
            {[
              { id: 'ingredients', label: 'Ayurvedic Botanicals' },
              { id: 'benefits', label: 'Classical Benefits' },
              { id: 'dosage', label: 'Dosage & Anupana' },
              { id: 'reviews', label: `Customer Reviews (${customReviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-sm font-medium whitespace-nowrap transition-colors relative py-2 ${
                  activeTab === tab.id
                    ? 'text-[#1a1c18] font-semibold'
                    : 'text-[#1a1c18]/50 hover:text-[#1a1c18]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#3c4433] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {/* 1. Botanicals */}
            {activeTab === 'ingredients' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm text-[#1a1c18]/70 font-body leading-relaxed">
                    Every botanical in {product.name} is selected based on classical Charaka and Sushruta Samhita guidelines,
                    harvested in appropriate Ritu (season) for peak bio-potency.
                  </p>
                  <button
                    onClick={() => setIsExplorerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2b3323] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#191c18] transition-colors shrink-0 self-start sm:self-auto cursor-pointer shadow-xs"
                  >
                    <Microscope className="w-3.5 h-3.5 text-[#dac5a7]" />
                    <span>Microscope View</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-xl border border-[rgba(26,28,24,0.06)] shadow-xs"
                    >
                      <h4 className="font-serif text-base text-[#1a1c18] font-normal">
                        {ing.name}
                      </h4>
                      {ing.botanicalName && (
                        <p className="font-mono text-[11px] text-[#757d5c] italic mt-0.5">
                          {ing.botanicalName}
                        </p>
                      )}
                      <p className="text-xs text-[#1a1c18]/65 mt-2 font-body">
                        {ing.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Classical Benefits */}
            {activeTab === 'benefits' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-sm text-[#1a1c18]/70 font-body leading-relaxed mb-4">
                  Formulated to restore equilibrium to Tridosha (Vata, Pitta, Kapha) and rejuvenate Dhatus (bodily tissues):
                </p>
                <div className="space-y-3">
                  {product.keyBenefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[rgba(26,28,24,0.06)]"
                    >
                      <Check className="w-4 h-4 text-[#757d5c] mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-[#1a1c18]/80 leading-relaxed font-body">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Dosage & Anupana */}
            {activeTab === 'dosage' && (
              <div className="space-y-6 max-w-3xl bg-white p-6 rounded-2xl border border-[rgba(26,28,24,0.08)]">
                <div>
                  <h4 className="font-serif text-lg text-[#1a1c18] mb-2">Recommended Daily Regimen</h4>
                  <p className="text-xs sm:text-sm text-[#1a1c18]/75 leading-relaxed font-body">
                    {product.dosageInstructions}
                  </p>
                </div>

                <div className="p-4 bg-[#f2f2ef] rounded-xl text-xs text-[#1a1c18]/70 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#757d5c] font-bold block">
                    ANUPANA (VEHICLE / CARRIER)
                  </span>
                  <p>
                    Classical Rasayanas produce superior therapeutic absorption when paired with warm water, A2 cow milk, or organic honey as guided by your Ayurvedic physician.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add review form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] space-y-4 shadow-xs"
                >
                  <h4 className="font-serif text-lg text-[#1a1c18]">Share Your Ayurvedic Experience</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 block mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="E.g., Dr. Ananya Sharma"
                        className="w-full p-2.5 text-xs bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-lg focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 block mb-1">
                        Rating (Stars)
                      </label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full p-2.5 text-xs bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-lg focus:outline-none"
                      >
                        <option value={5}>5 Stars — Excellent Efficacy</option>
                        <option value={4}>4 Stars — Very Good</option>
                        <option value={3}>3 Stars — Satisfactory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 block mb-1">
                      Your Ayurvedic Journey & Observed Results
                    </label>
                    <textarea
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Describe how this formulation supported your health..."
                      rows={3}
                      className="w-full p-2.5 text-xs bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-lg focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {customReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 bg-white rounded-xl border border-[rgba(26,28,24,0.06)] space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#dac5a7] text-[#dac5a7]" />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono text-[#1a1c18]/40">{rev.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#1a1c18]/80 font-body leading-relaxed">
                        “{rev.comment}”
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#1a1c18]/50 border-t border-[rgba(26,28,24,0.04)]">
                        <span className="font-medium text-[#1a1c18]">{rev.author}</span>
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Formulations Carousel / Grid */}
        <div className="mt-20 pt-12 border-t border-[rgba(26,28,24,0.08)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#757d5c] font-semibold">
                HARMONIOUS PAIRINGS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c18] font-normal mt-1">
                Related Ayurvedic Formulations
              </h2>
            </div>

            <Link
              to="/store"
              className="text-xs font-medium text-[#1a1c18] hover:text-[#3c4433] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Botanical Herb Explorer Modal */}
      <BotanicalHerbExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />
    </div>
  );
};
