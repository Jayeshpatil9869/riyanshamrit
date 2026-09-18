import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { useRouter } from '../context/RouterContext';
import { X, Check, Star, ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist
  } = useCommerce();

  const { navigate } = useRouter();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const handleFullDetail = () => {
    setQuickViewProduct(null);
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        id="quickview-backdrop"
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-[#1a1c18]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div
        id="quickview-modal-card"
        className="relative w-full max-w-3xl bg-[#f2f2ef] rounded-3xl shadow-[0_24px_60px_rgba(26,28,24,0.3)] border border-[rgba(26,28,24,0.12)] overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-[#1a1c18] shadow-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Column */}
        <div className="w-full md:w-1/2 relative bg-[#e8e8e1] min-h-[260px] md:min-h-[440px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.tag && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#1a1c18] text-[#dac5a7] rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold">
              {product.tag}
            </span>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white/70">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#757d5c] font-semibold">
                  {product.category}
                </span>
                <span className="text-[#1a1c18]/20">•</span>
                <span className="text-[10px] font-mono text-[#1a1c18]/50">
                  {product.volume}
                </span>
              </div>
              <h2 className="font-serif text-2xl text-[#1a1c18] font-normal leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#1a1c18]/65 mt-1 font-body">
                {product.tagline}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between py-2 border-y border-[rgba(26,28,24,0.08)]">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-[#1a1c18]">
                  {formatPrice(product.price)}
                </span>
                <span className="font-mono text-xs text-[#1a1c18]/40 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[10px] font-mono bg-[#757d5c]/15 text-[#3c4433] px-2 py-0.5 rounded font-semibold">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-[#1a1c18]/70">
                <Star className="w-3.5 h-3.5 fill-[#dac5a7] text-[#dac5a7]" />
                <span className="font-mono font-medium">{product.rating}</span>
                <span className="text-[11px] text-[#1a1c18]/40">({product.reviewCount})</span>
              </div>
            </div>

            {/* Description Excerpt */}
            <p className="text-xs text-[#1a1c18]/75 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Key Benefits */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/50 font-semibold">
                Classical Benefits
              </p>
              {product.keyBenefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#1a1c18]/80">
                  <Check className="w-3.5 h-3.5 text-[#757d5c] flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[rgba(26,28,24,0.18)] rounded-full px-3 py-1.5 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-1 text-sm text-[#1a1c18]/60 hover:text-[#1a1c18]"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-1 text-sm text-[#1a1c18]/60 hover:text-[#1a1c18]"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                id="btn-quickview-add-cart"
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-4 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(26,28,24,0.15)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isWish
                    ? 'border-red-500 text-red-600 bg-red-50'
                    : 'border-[rgba(26,28,24,0.18)] text-[#1a1c18]/60 hover:text-[#1a1c18] bg-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleFullDetail}
              className="w-full text-center text-xs text-[#1a1c18]/70 hover:text-[#1a1c18] font-medium transition-colors flex items-center justify-center gap-1.5 pt-1"
            >
              <span>View Complete Ayurvedic Formulation Details & Dosage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#1a1c18]/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#757d5c]" />
              <span>GMP Certified • 100% Herbal • Authentic Sangamner Origin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
