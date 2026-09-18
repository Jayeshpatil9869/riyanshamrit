import React, { useState } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { useRouter, Link } from '../context/RouterContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    isFreeShipping,
    formatPrice,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    orderNote,
    setOrderNote
  } = useCommerce();

  const { navigate } = useRouter();
  const [promoInput, setPromoInput] = useState('');
  const [showNoteField, setShowNoteField] = useState(false);

  if (!isCartDrawerOpen) return null;

  const progress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-[#1a1c18]/45 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div
        id="cart-drawer-panel"
        className="relative w-full max-w-md bg-[#f2f2ef] h-full shadow-[0_24px_60px_rgba(26,28,24,0.25)] flex flex-col z-10 border-l border-[rgba(26,28,24,0.08)]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[rgba(26,28,24,0.08)] flex items-center justify-between bg-white/60">
          <div>
            <h2 className="font-serif text-[20px] text-[#1a1c18] font-normal leading-none">
              Your Shopping Bag
            </h2>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/40 mt-1">
              {cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <button
            id="close-cart-drawer"
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 hover:bg-black/5 rounded-full text-[#1a1c18]/70 hover:text-[#1a1c18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#e8e8e1] border-b border-[rgba(26,28,24,0.06)] text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium text-[#1a1c18]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#757d5c]" />
              {isFreeShipping ? (
                <span className="text-[#3c4433] font-semibold">Complimentary Pan-India Shipping Unlocked!</span>
              ) : (
                <span>
                  Add <strong className="font-mono">{formatPrice(amountNeeded)}</strong> for Free Delivery
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#1a1c18]/60">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3c4433] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#1a1c18]/40 font-serif text-xl">
                ∅
              </div>
              <p className="font-serif text-lg text-[#1a1c18]">Your bag is currently empty.</p>
              <p className="text-xs text-[#1a1c18]/60 max-w-xs mx-auto">
                Discover classical Ayurvedic rasayanas formulated with authentic wild herbs from the Western Ghats.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/store');
                }}
                className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1c18] text-[#f2f2ef] rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
              >
                Browse All Formulations
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 bg-white p-3.5 rounded-xl border border-[rgba(26,28,24,0.06)] shadow-xs"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f2f2ef] flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => {
                          setIsCartDrawerOpen(false);
                          navigate(`/products/${item.product.slug}`);
                        }}
                        className="text-xs font-medium text-[#1a1c18] hover:text-[#757d5c] cursor-pointer transition-colors leading-snug line-clamp-1"
                      >
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#1a1c18]/30 hover:text-red-600 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[10px] font-mono text-[#1a1c18]/40 mt-0.5">
                      {item.selectedVolume || item.product.volume} • {item.product.category.split('&')[0]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(26,28,24,0.06)]">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[rgba(26,28,24,0.12)] rounded-full px-2 py-0.5 bg-[#f2f2ef]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-[#3c4433] text-[#1a1c18]/60"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-[#3c4433] text-[#1a1c18]/60"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="font-mono text-xs font-semibold text-[#1a1c18]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="space-y-3 pt-2">
              {/* Order Note Toggle */}
              <div className="text-xs">
                <button
                  onClick={() => setShowNoteField(!showNoteField)}
                  className="text-[11px] text-[#1a1c18]/60 hover:text-[#1a1c18] underline underline-offset-2"
                >
                  {orderNote ? 'Edit Ayurvedic Consultation / Order Note' : '+ Add Doctor or Special Delivery Note'}
                </button>
                {showNoteField && (
                  <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="E.g., Any pre-existing health condition, delivery instructions, or doctor consultation request..."
                    className="w-full mt-2 p-2.5 text-xs bg-white border border-[rgba(26,28,24,0.15)] rounded-lg focus:outline-none focus:border-[#3c4433]"
                    rows={2}
                  />
                )}
              </div>

              {/* Coupon Field */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#dac5a7]/20 border border-[#dac5a7] rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-[#3c4433]">
                      <Tag className="w-3.5 h-3.5" />
                      <span className="font-mono font-medium">{appliedCoupon} Applied (-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#1a1c18]/60 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (AMRIT10 / HARGHAR)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[rgba(26,28,24,0.15)] rounded-lg font-mono focus:outline-none uppercase"
                    />
                    <button
                      onClick={() => {
                        applyCoupon(promoInput);
                        setPromoInput('');
                      }}
                      className="px-3 py-1.5 bg-[#3c4433] text-white rounded-lg text-xs font-medium hover:bg-[#1a1c18] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[rgba(26,28,24,0.08)] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#1a1c18]/70">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#757d5c] font-medium">
                  <span>Ayurvedic Patron Discount</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#1a1c18]/70">
                <span>Pan-India Shipping</span>
                <span className="font-mono">
                  {shippingFee === 0 ? (
                    <span className="text-[#3c4433] font-medium">Complimentary</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-[#1a1c18] pt-2 border-t border-[rgba(26,28,24,0.08)]">
                <span>Estimated Total</span>
                <span className="font-mono text-base">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="btn-view-full-cart"
                onClick={handleViewCartClick}
                className="w-full py-2.5 px-3 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] text-[#1a1c18] rounded-full text-xs font-medium transition-colors text-center"
              >
                View Full Bag
              </button>

              <button
                id="btn-drawer-checkout"
                onClick={handleCheckoutClick}
                className="w-full py-2.5 px-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(26,28,24,0.14)]"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#1a1c18]/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#757d5c]" />
              <span>Direct Dispatch from Sangamner • 100% Tamper-Evident Seal</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
