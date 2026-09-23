import React from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { ProductCard } from '../components/ProductCard';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, addToCart, formatPrice } = useCommerce();
  const { navigate } = useRouter();

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      addToCart(item.product);
    });
  };

  return (
    <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="kanva-container">
        {/* Header */}
        <div className="py-8 sm:py-12 border-b border-[rgba(26,28,24,0.08)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-1">
              MY WISHLIST
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
              Saved Products
            </h1>
            <p className="text-xs sm:text-sm text-[#1a1c18]/60 mt-2 font-body">
              {wishlist.length} classical Ayurvedic {wishlist.length === 1 ? 'item' : 'items'} saved for future rejuvenation.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToBag}
                className="px-5 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>

              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 border border-[rgba(26,28,24,0.18)] hover:bg-white text-xs text-[#1a1c18]/70 rounded-full transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#1a1c18]/40 font-serif text-2xl">
              ♡
            </div>
            <h2 className="font-serif text-2xl text-[#1a1c18]">Your Wishlist is Empty</h2>
            <p className="text-xs text-[#1a1c18]/60 leading-relaxed font-body">
              Explore our dispensary and bookmark the formulations that align with your health and Dosha requirements.
            </p>
            <button
              onClick={() => navigate('/store')}
              className="mt-2 px-7 py-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Formulations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10">
            {wishlist.map((item) => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
