import React, { useEffect } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import confetti from 'canvas-confetti';
import { ShimmerButton } from '../components/ui/ShimmerButton';
import { BorderBeam } from '../components/ui/BorderBeam';
import { CheckCircle2, AlertTriangle, Clock, ArrowRight, Printer, ShieldCheck, Phone, HelpCircle } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const { orders, formatPrice } = useCommerce();

  const orderId = queryParams.get('orderId');
  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#dac5a7', '#2b3323', '#d99b26', '#1a1c18', '#ffffff']
    });
  }, []);

  return (
    <div className="w-full pt-10 pb-24">
      <div className="kanva-container max-w-2xl text-center space-y-6">
        {/* Animated Badge */}
        <div className="w-20 h-20 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-2">
            ORDER CONFIRMED • DISPATCH COMMENCED
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
            Thank You for Your Trust.
          </h1>
          <p className="text-sm sm:text-base text-[#1a1c18]/70 font-body leading-relaxed mt-2 max-w-md mx-auto">
            Your classical Ayurvedic formulations are being hand-packed with tamper-evident seals at our Sangamner facility.
          </p>
        </div>

        {/* Order Details Card */}
        {currentOrder && (
          <div className="relative p-6 sm:p-8 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs text-left space-y-6 overflow-hidden">
            <BorderBeam size={220} duration={12} colorFrom="#dac5a7" colorTo="#3c4433" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(26,28,24,0.06)] gap-2">
              <div>
                <span className="text-[10px] font-mono text-[#1a1c18]/50 uppercase tracking-wider block">
                  PATRON ORDER REFERENCE
                </span>
                <span className="font-mono text-base font-bold text-[#1a1c18]">
                  {currentOrder.id}
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] font-mono text-[#1a1c18]/50 uppercase tracking-wider block">
                  ESTIMATED DELIVERY
                </span>
                <span className="text-xs font-semibold text-[#3c4433]">
                  {currentOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Items summary */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/50 font-semibold block">
                Formulations in Package ({currentOrder.items.length})
              </span>
              {currentOrder.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-[#f2f2ef]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-medium text-[#1a1c18]">{item.productName}</p>
                      <p className="text-[10px] font-mono text-[#1a1c18]/50">
                        Qty: {item.quantity} • {item.volume}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-[#1a1c18]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-[rgba(26,28,24,0.06)] flex justify-between text-sm font-semibold text-[#1a1c18]">
              <span>Paid via {currentOrder.paymentMethod}</span>
              <span className="font-mono text-lg">{formatPrice(currentOrder.total)}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] rounded-full text-xs font-medium text-[#1a1c18] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Tax Invoice</span>
              </button>

              <ShimmerButton
                onClick={() => navigate('/account/orders')}
                background="#1a1c18"
                shimmerColor="#dac5a7"
                className="flex-1 !py-3 !px-5 !text-xs !font-mono uppercase tracking-wider"
              >
                <span>Track Order Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </ShimmerButton>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={() => navigate('/store')}
            className="text-xs text-[#1a1c18]/70 hover:text-[#1a1c18] underline underline-offset-4"
          >
            Continue Browsing The Dispensary
          </button>
        </div>
      </div>
    </div>
  );
};

export const OrderFailurePage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full py-20">
      <div className="kanva-container max-w-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-red-600 font-semibold block mb-2">
            GATEWAY TRANSACTION DECLINED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal">
            Payment Could Not Be Completed
          </h1>
          <p className="text-sm text-[#1a1c18]/70 font-body leading-relaxed mt-3 max-w-md mx-auto">
            Your bank or payment gateway was unable to authorize the charge. No money was deducted from your account. Your shopping bag remains saved.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] text-xs text-[#1a1c18]/70 space-y-3">
          <p>Common reasons include network interruption, incorrect OTP, or bank security limits.</p>
          <div className="flex items-center justify-center gap-2 text-[#3c4433] font-medium pt-2 border-t border-[rgba(26,28,24,0.06)]">
            <Phone className="w-3.5 h-3.5" />
            <span>Need telephone assistance? Call helpline: +91 98224 88300</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/checkout/payment')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors"
          >
            Retry Payment Method
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="w-full sm:w-auto px-7 py-3.5 border border-[rgba(26,28,24,0.18)] hover:bg-white text-[#1a1c18] rounded-full text-xs font-medium transition-colors"
          >
            Return to Shopping Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export const OrderPendingPage: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const orderId = queryParams.get('orderId');

  return (
    <div className="w-full py-20">
      <div className="kanva-container max-w-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <Clock className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-amber-700 font-semibold block mb-2">
            AWAITING BANK CLEARANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal">
            Payment Verification in Progress
          </h1>
          <p className="text-sm text-[#1a1c18]/70 font-body leading-relaxed mt-3 max-w-md mx-auto">
            Your banking institution has accepted the instruction and is conducting final settlement. Order Reference: <strong className="font-mono text-[#1a1c18]">{orderId || 'RYN-PENDING'}</strong>.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] text-xs text-[#1a1c18]/70 space-y-2">
          <p>You will receive an automated SMS confirmation as soon as reconciliation completes (usually within 15–30 minutes).</p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/account/orders')}
            className="px-8 py-3.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors"
          >
            Go to My Orders
          </button>
        </div>
      </div>
    </div>
  );
};
