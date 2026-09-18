import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { ShieldCheck, ArrowRight, Lock, Sparkles, ChevronLeft } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    shippingFee,
    formatPrice,
    orderNote,
    shippingAddress,
    setShippingAddress,
    addToast
  } = useCommerce();

  const { navigate } = useRouter();

  const [form, setForm] = useState(shippingAddress);

  if (cart.length === 0) {
    return (
      <div className="w-full py-24 text-center">
        <h2 className="font-serif text-2xl text-[#1a1c18]">Your cart is empty</h2>
        <button
          onClick={() => navigate('/store')}
          className="mt-4 px-6 py-2.5 bg-[#1a1c18] text-white rounded-full text-xs font-medium"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.addressLine1 || !form.city || !form.pincode) {
      addToast('Please complete all required shipping fields', 'error');
      return;
    }
    setShippingAddress(form);
    navigate('/checkout/payment');
  };

  return (
    <div className="w-full pt-8 pb-24">
      <div className="kanva-container">
        {/* Checkout Header */}
        <div className="py-6 border-b border-[rgba(26,28,24,0.08)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block">
              SECURE CHECKOUT • STEP 1 OF 2
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal mt-1">
              Shipping & Delivery Details
            </h1>
          </div>

          <button
            onClick={() => navigate('/cart')}
            className="text-xs text-[#1a1c18]/60 hover:text-[#1a1c18] flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
          {/* Left Column: Shipping Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-4">
                <h2 className="font-serif text-xl text-[#1a1c18]">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="E.g., Dr. Ramesh Deshmukh"
                      className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      Mobile Number (For Courier OTP) *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98224 00000"
                      className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Email Address (For Invoice & Tracking Link) *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="patron@example.com"
                    className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-4">
                <h2 className="font-serif text-xl text-[#1a1c18]">Delivery Destination</h2>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    House / Flat No., Building & Street Address *
                  </label>
                  <input
                    type="text"
                    value={form.addressLine1}
                    onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                    placeholder="Flat 402, Shanti Kunj, Near Ganpati Temple"
                    className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Area, Colony or Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.addressLine2}
                    onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                    placeholder="Opposite Ayurvedic Research Center"
                    className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Pune / Mumbai / Sangamner"
                      className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="Maharashtra"
                      className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="422605"
                      className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs sm:text-sm text-[#1a1c18] focus:outline-none focus:border-[#3c4433] font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-3">
                <h2 className="font-serif text-xl text-[#1a1c18]">Shipping Protocol</h2>

                <label className="flex items-center justify-between p-4 border border-[#3c4433] bg-[#dac5a7]/10 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingSpeed"
                      defaultChecked
                      className="text-[#3c4433]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#1a1c18] block">
                        Standard Pan-India Insured Dispatch (3-5 Business Days)
                      </span>
                      <span className="text-[11px] text-[#1a1c18]/60">
                        Dispatched from Sangamner with tamper-evident seal
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#3c4433]">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="btn-continue-payment"
                className="w-full py-4 px-6 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium tracking-wide transition-all shadow-[0_4px_16px_rgba(26,28,24,0.18)] flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Order Review (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-6">
              <h3 className="font-serif text-xl text-[#1a1c18] pb-3 border-b border-[rgba(26,28,24,0.06)]">
                Bag Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              {/* Items Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-[#f2f2ef] flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1a1c18] truncate">{item.product.name}</p>
                      <p className="text-[10px] font-mono text-[#1a1c18]/50">
                        Qty: {item.quantity} • {item.product.volume}
                      </p>
                    </div>
                    <span className="font-mono font-medium text-[#1a1c18]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {orderNote && (
                <div className="p-3 bg-[#f2f2ef] rounded-xl text-xs text-[#1a1c18]/70">
                  <strong className="block text-[10px] font-mono uppercase text-[#757d5c]">
                    Patron Consultation Note:
                  </strong>
                  <p className="italic text-[11px] mt-0.5">{orderNote}</p>
                </div>
              )}

              {/* Cost breakdown */}
              <div className="space-y-2 text-xs pt-4 border-t border-[rgba(26,28,24,0.06)]">
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
                  <span>Shipping</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#1a1c18] pt-3 border-t border-[rgba(26,28,24,0.08)]">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#1a1c18]/50 pt-2 justify-center">
                <Lock className="w-3.5 h-3.5 text-[#757d5c]" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
