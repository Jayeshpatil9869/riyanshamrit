import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    isFreeShipping,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    orderNote,
    setOrderNote
  } = useCommerce();

  const { navigate } = useRouter();
  const [promoInput, setPromoInput] = useState('');

  const progress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
        <div className="kanva-container max-w-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#1a1c18]/40 font-serif text-2xl">
            ∅
          </div>
          <h1 className="font-serif text-3xl text-[#1a1c18]">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-[#1a1c18]/60 leading-relaxed font-body">
            You have not added any classical Ayurvedic formulations to your bag yet. Explore our signature botanical remedies.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/store')}
              className="px-8 py-3 bg-[#1a1c18] text-white rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
            >
              Browse All Formulations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="kanva-container">
        {/* Header */}
        <div className="py-8 border-b border-[rgba(26,28,24,0.08)]">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-1">
            PATRON DISPENSARY BAG
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
            Your Shopping Bag
          </h1>
        </div>

        {/* Free Shipping Progress */}
        <div className="my-6 p-4 bg-[#e8e8e1] rounded-2xl border border-[rgba(26,28,24,0.06)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#757d5c]" />
            {isFreeShipping ? (
              <span className="text-[#3c4433] font-semibold">
                Complimentary Pan-India Delivery Unlocked!
              </span>
            ) : (
              <span>
                Add <strong className="font-mono">{formatPrice(amountNeeded)}</strong> more to qualify for Free Shipping
              </span>
            )}
          </div>

          <div className="w-full sm:w-48 h-2 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3c4433] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Cart Items (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-[rgba(26,28,24,0.06)] shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#f2f2ef] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#757d5c] tracking-wider block">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => navigate(`/products/${item.product.slug}`)}
                      className="font-serif text-lg text-[#1a1c18] hover:text-[#3c4433] cursor-pointer transition-colors"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#1a1c18]/50 font-mono mt-0.5">
                      {item.selectedVolume || item.product.volume} • Unit: {formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[rgba(26,28,24,0.06)]">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[rgba(26,28,24,0.18)] rounded-full px-3 py-1 bg-[#f2f2ef]">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="text-sm px-1 text-[#1a1c18]/60 hover:text-[#1a1c18]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-mono font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="text-sm px-1 text-[#1a1c18]/60 hover:text-[#1a1c18]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <span className="font-mono text-base font-bold text-[#1a1c18]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#1a1c18]/30 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Ayurvedic Consultation / Delivery Note */}
            <div className="p-6 bg-white rounded-2xl border border-[rgba(26,28,24,0.06)] space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#1a1c18]/70 block font-medium">
                Ayurvedic Consultation Note or Special Delivery Instruction
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Mention any existing health conditions (e.g., blood sugar levels, joint pain history) or apartment delivery instructions..."
                rows={2}
                className="w-full p-3 text-xs bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none focus:border-[#3c4433]"
              />
            </div>
          </div>

          {/* Right: Order Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-6">
              <h2 className="font-serif text-2xl text-[#1a1c18] font-normal pb-4 border-b border-[rgba(26,28,24,0.06)]">
                Order Summary
              </h2>

              {/* Coupon Code Input */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 block mb-1.5 font-medium">
                  Promotional Coupon
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-[#dac5a7]/20 border border-[#dac5a7] rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-[#3c4433]">
                      <Tag className="w-4 h-4" />
                      <span className="font-mono font-medium">{appliedCoupon} Applied</span>
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
                      placeholder="AMRIT10 or HARGHAR"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl font-mono uppercase focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        applyCoupon(promoInput);
                        setPromoInput('');
                      }}
                      className="px-4 py-2 bg-[#3c4433] hover:bg-[#1a1c18] text-white rounded-xl text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-[#1a1c18]/45 mt-1.5 font-mono">
                  Tip: Use <strong>AMRIT10</strong> for 10% off, or <strong>HARGHAR</strong> for ₹150 off.
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs pt-4 border-t border-[rgba(26,28,24,0.06)]">
                <div className="flex justify-between text-[#1a1c18]/70">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#757d5c] font-medium">
                    <span>Coupon Savings</span>
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

                <div className="flex justify-between text-base font-semibold text-[#1a1c18] pt-4 border-t border-[rgba(26,28,24,0.08)]">
                  <span>Estimated Total</span>
                  <span className="font-mono text-xl">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="cart-page-checkout-btn"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium tracking-wide transition-all shadow-[0_4px_16px_rgba(26,28,24,0.18)] flex items-center justify-center gap-2"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#1a1c18]/50 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#757d5c]" />
                <span>Direct Dispatch from Sangamner • 100% Tamper-Evident Seal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
