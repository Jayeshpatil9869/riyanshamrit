import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { ShieldCheck, QrCode, CreditCard, Banknote, ArrowRight, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    formatPrice,
    shippingAddress,
    createOrder,
    addToast
  } = useCommerce();

  const { navigate } = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'payu' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="w-full py-24 text-center">
        <h2 className="font-serif text-2xl text-[#1a1c18]">No active session</h2>
        <button
          onClick={() => navigate('/store')}
          className="mt-4 px-6 py-2.5 bg-[#1a1c18] text-white rounded-full text-xs font-medium"
        >
          Return to Dispensary
        </button>
      </div>
    );
  }

  const handleCompleteOrder = (status: 'success' | 'failure' | 'pending') => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (status === 'success') {
        const order = createOrder({
          paymentMethod: selectedMethod === 'upi' ? 'UPI' : selectedMethod === 'payu' ? 'PayU Gateway' : 'Cash on Delivery',
          paymentStatus: 'paid'
        });
        addToast('Payment successfully processed! Order confirmed.', 'success');
        navigate(`/orders/success?orderId=${order.id}`);
      } else if (status === 'failure') {
        addToast('Payment transaction was declined by issuing bank', 'error');
        navigate('/orders/failure');
      } else {
        const order = createOrder({
          paymentMethod: 'Net Banking',
          paymentStatus: 'pending'
        });
        addToast('Awaiting clearance from your banking portal', 'info');
        navigate(`/orders/pending?orderId=${order.id}`);
      }
    }, 900);
  };

  return (
    <div className="w-full pt-8 pb-24">
      <div className="kanva-container max-w-4xl">
        {/* Header */}
        <div className="py-6 border-b border-[rgba(26,28,24,0.08)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block">
              SECURE PAYMENT • STEP 2 OF 2
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal mt-1">
              Select Payment Method
            </h1>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="text-xs text-[#1a1c18]/60 hover:text-[#1a1c18] flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Edit Shipping</span>
          </button>
        </div>

        {/* Payment Methods Grid */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Method Selector (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            {/* UPI Option */}
            <div
              onClick={() => setSelectedMethod('upi')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === 'upi'
                  ? 'bg-white border-[#3c4433] shadow-md'
                  : 'bg-white/60 border-[rgba(26,28,24,0.08)] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dac5a7]/30 flex items-center justify-center text-[#3c4433]">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a1c18]">Instant UPI / QR Code</h3>
                    <p className="text-xs text-[#1a1c18]/60">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === 'upi'}
                  onChange={() => setSelectedMethod('upi')}
                  className="text-[#3c4433]"
                />
              </div>

              {selectedMethod === 'upi' && (
                <div className="mt-4 pt-4 border-t border-[rgba(26,28,24,0.06)] text-xs space-y-3 bg-[#f2f2ef] p-4 rounded-xl">
                  <p className="text-[#1a1c18]/80 font-medium">
                    Scan via any UPI App or use VPA: <span className="font-mono text-[#3c4433]">riyansh@icici</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white rounded border border-[rgba(26,28,24,0.08)] font-mono text-[11px]">GPay</span>
                    <span className="px-2.5 py-1 bg-white rounded border border-[rgba(26,28,24,0.08)] font-mono text-[11px]">PhonePe</span>
                    <span className="px-2.5 py-1 bg-white rounded border border-[rgba(26,28,24,0.08)] font-mono text-[11px]">Paytm</span>
                    <span className="px-2.5 py-1 bg-white rounded border border-[rgba(26,28,24,0.08)] font-mono text-[11px]">Cred UPI</span>
                  </div>
                </div>
              )}
            </div>

            {/* PayU Gateway Option */}
            <div
              onClick={() => setSelectedMethod('payu')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === 'payu'
                  ? 'bg-white border-[#3c4433] shadow-md'
                  : 'bg-white/60 border-[rgba(26,28,24,0.08)] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dac5a7]/30 flex items-center justify-center text-[#3c4433]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a1c18]">PayU Secure Gateway</h3>
                    <p className="text-xs text-[#1a1c18]/60">Credit/Debit Cards, Net Banking, EMI</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === 'payu'}
                  onChange={() => setSelectedMethod('payu')}
                  className="text-[#3c4433]"
                />
              </div>

              {selectedMethod === 'payu' && (
                <div className="mt-4 pt-4 border-t border-[rgba(26,28,24,0.06)] text-xs text-[#1a1c18]/70 bg-[#f2f2ef] p-4 rounded-xl">
                  Supports Visa, Mastercard, RuPay, Maestro, and 50+ Indian Net Banking portals.
                </div>
              )}
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setSelectedMethod('cod')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === 'cod'
                  ? 'bg-white border-[#3c4433] shadow-md'
                  : 'bg-white/60 border-[rgba(26,28,24,0.08)] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dac5a7]/30 flex items-center justify-center text-[#3c4433]">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a1c18]">Cash on Delivery (COD)</h3>
                    <p className="text-xs text-[#1a1c18]/60">Pay cash/UPI at doorstep upon delivery</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === 'cod'}
                  onChange={() => setSelectedMethod('cod')}
                  className="text-[#3c4433]"
                />
              </div>
            </div>

            {/* Action Buttons & Realistic Simulation Switches */}
            <div className="pt-6 space-y-3">
              <button
                id="btn-pay-now-success"
                onClick={() => handleCompleteOrder('success')}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isProcessing ? 'Authorizing with Bank...' : `Authorize & Pay ${formatPrice(cartTotal)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Dev Simulation Helpers */}
              <div className="p-4 bg-[#e8e8e1] rounded-2xl text-xs space-y-2 border border-[rgba(26,28,24,0.08)]">
                <span className="font-mono text-[10px] uppercase text-[#1a1c18]/50 block">
                  Commerce Gateway Scenarios:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCompleteOrder('success')}
                    className="px-3 py-1.5 bg-white hover:bg-[#3c4433] hover:text-white rounded-lg text-[11px] font-medium transition-colors"
                  >
                    ✓ Test Success Flow
                  </button>
                  <button
                    onClick={() => handleCompleteOrder('failure')}
                    className="px-3 py-1.5 bg-white hover:bg-red-700 hover:text-white rounded-lg text-[11px] font-medium transition-colors"
                  >
                    ✕ Test Gateway Failure
                  </button>
                  <button
                    onClick={() => handleCompleteOrder('pending')}
                    className="px-3 py-1.5 bg-white hover:bg-amber-700 hover:text-white rounded-lg text-[11px] font-medium transition-colors"
                  >
                    ⏳ Test Pending Settlement
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Review (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-4 text-xs">
              <h3 className="font-serif text-lg text-[#1a1c18]">Shipping Destination</h3>
              <div className="text-[#1a1c18]/70 leading-relaxed font-body">
                <strong className="text-[#1a1c18] block font-semibold">{shippingAddress.fullName}</strong>
                <span>{shippingAddress.addressLine1}</span><br />
                {shippingAddress.addressLine2 && <span>{shippingAddress.addressLine2}<br /></span>}
                <span>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</span><br />
                <span className="font-mono text-[11px] text-[#1a1c18]/60 mt-1 block">Phone: {shippingAddress.phone}</span>
              </div>

              <div className="pt-4 border-t border-[rgba(26,28,24,0.06)] flex justify-between text-sm font-semibold text-[#1a1c18]">
                <span>Total Due</span>
                <span className="font-mono text-lg">{formatPrice(cartTotal)}</span>
              </div>

              <div className="p-3 bg-[#f2f2ef] rounded-xl flex items-center gap-2 text-[10px] text-[#1a1c18]/60">
                <ShieldCheck className="w-4 h-4 text-[#757d5c] flex-shrink-0" />
                <span>Verified Merchant: Riyansh Multitrade Pvt. Ltd. (Sangamner)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
