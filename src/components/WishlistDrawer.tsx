import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { useRouter } from '../context/RouterContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    removeFromWishlist,
    addToCart,
    formatPrice
  } = useCommerce();

  const { navigate } = useRouter();

  if (!isWishlistDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      {/* Backdrop */}
      <div
        id="wishlist-backdrop"
        onClick={() => setIsWishlistDrawerOpen(false)}
        className="fixed inset-0 bg-[#1a1c18]/45 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div
        id="wishlist-drawer-panel"
        className="relative w-full max-w-md bg-[#f2f2ef] h-full shadow-[0_24px_60px_rgba(26,28,24,0.25)] flex flex-col z-10 border-l border-[rgba(26,28,24,0.08)]"
      >
        <div className="p-5 border-b border-[rgba(26,28,24,0.08)] flex items-center justify-between bg-white/60">
          <div>
            <h2 className="font-serif text-[20px] text-[#1a1c18] font-normal leading-none">
              Saved Formulations
            </h2>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/40 mt-1">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>

          <button
            id="close-wishlist-drawer"
            onClick={() => setIsWishlistDrawerOpen(false)}
            className="p-2 hover:bg-black/5 rounded-full text-[#1a1c18]/70 hover:text-[#1a1c18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#1a1c18]/40 font-serif text-xl">
                ♡
              </div>
              <p className="font-serif text-lg text-[#1a1c18]">Your wishlist is empty.</p>
              <p className="text-xs text-[#1a1c18]/60 max-w-xs mx-auto">
                Save your favorite botanical tonics and remedies to purchase at your leisure.
              </p>
              <button
                onClick={() => {
                  setIsWishlistDrawerOpen(false);
                  navigate('/store');
                }}
                className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1c18] text-[#f2f2ef] rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
              >
                Explore All Formulations
              </button>
            </div>
          ) : (
            wishlist.map(({ product }) => (
              <div
                key={product.id}
                className="flex gap-3.5 bg-white p-3.5 rounded-xl border border-[rgba(26,28,24,0.06)] shadow-xs"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f2f2ef] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => {
                          setIsWishlistDrawerOpen(false);
                          navigate(`/products/${product.slug}`);
                        }}
                        className="text-xs font-medium text-[#1a1c18] hover:text-[#757d5c] cursor-pointer transition-colors leading-snug line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-[#1a1c18]/30 hover:text-red-600 transition-colors p-0.5"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[10px] font-mono text-[#1a1c18]/40 mt-0.5">
                      {product.volume} • {product.category.split('&')[0]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(26,28,24,0.06)]">
                    <span className="font-mono text-xs font-semibold text-[#1a1c18]">
                      {formatPrice(product.price)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3c4433] hover:bg-[#1a1c18] text-white rounded-full text-[11px] font-medium transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-4 bg-white border-t border-[rgba(26,28,24,0.08)]">
            <button
              onClick={() => {
                setIsWishlistDrawerOpen(false);
                navigate('/wishlist');
              }}
              className="w-full py-2.5 px-4 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>View Full Wishlist Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
