import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ArrowRight, Printer, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, formatPrice, addToast } = useCommerce();
  const { navigate } = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCopyTracking = (trackNum?: string) => {
    if (trackNum && navigator.clipboard) {
      navigator.clipboard.writeText(trackNum);
      addToast(`Tracking number ${trackNum} copied!`, 'info');
    }
  };

  return (
    <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="kanva-container">
        {/* Header */}
        <div className="py-8 sm:py-12 border-b border-[rgba(26,28,24,0.08)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-1">
              PATRON DASHBOARD
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1a1c18] font-normal">
              Order History & Tracking
            </h1>
            <p className="text-xs sm:text-sm text-[#1a1c18]/60 mt-2 font-body">
              Monitor real-time dispatch from our Sangamner processing center.
            </p>
          </div>

          <Link
            to="/store"
            className="text-xs font-medium text-[#1a1c18] hover:text-[#3c4433] flex items-center gap-1.5"
          >
            <span>Visit Apothecary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Orders Listing */}
        {orders.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#1a1c18]/40 font-serif text-2xl">
              ∅
            </div>
            <h2 className="font-serif text-2xl text-[#1a1c18]">No Orders on File</h2>
            <p className="text-xs text-[#1a1c18]/60 leading-relaxed font-body">
              You have not placed any orders yet. Once placed, your dispatch tracking numbers and tax invoices will appear here.
            </p>
            <button
              onClick={() => navigate('/store')}
              className="mt-2 px-7 py-3 bg-[#1a1c18] text-white rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="py-10 space-y-6">
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6"
                >
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(26,28,24,0.06)] gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-[#1a1c18]">
                          {order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                          (order.status || 'confirmed') === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : (order.status || 'confirmed') === 'in_transit'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-[#dac5a7]/30 text-[#3c4433]'
                        }`}>
                          {(order.status || 'confirmed').replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#1a1c18]/50 font-mono mt-0.5 block">
                        Ordered on {order.createdAt || order.date} • Dispatched via {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-[#1a1c18]">
                        {formatPrice(order.total)}
                      </span>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] rounded-full text-xs font-medium text-[#1a1c18] transition-colors flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Tracking Step Progress */}
                  <div className="p-4 bg-[#f2f2ef] rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 text-xs">
                      <div>
                        <span className="font-medium text-[#1a1c18]">Courier Carrier: Bluedart Express / Delhivery</span>
                        {order.trackingNumber && (
                          <button
                            onClick={() => handleCopyTracking(order.trackingNumber)}
                            className="font-mono text-[#757d5c] hover:underline ml-2 text-[11px]"
                          >
                            AWB: {order.trackingNumber} (Copy)
                          </button>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#3c4433]">
                        Est. Delivery: {order.estimatedDelivery}
                      </span>
                    </div>

                    {/* Simple Step Indicator */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono uppercase">
                      <div className="space-y-1">
                        <div className="h-1.5 rounded-full bg-[#3c4433]" />
                        <span className="text-[#3c4433] font-semibold">Confirmed</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 rounded-full bg-[#3c4433]" />
                        <span className="text-[#3c4433] font-semibold">Packed</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`h-1.5 rounded-full ${(order.status || 'confirmed') === 'in_transit' || (order.status || 'confirmed') === 'delivered' ? 'bg-[#3c4433]' : 'bg-black/10'}`} />
                        <span className={(order.status || 'confirmed') === 'in_transit' || (order.status || 'confirmed') === 'delivered' ? 'text-[#3c4433] font-semibold' : 'text-[#1a1c18]/40'}>
                          In Transit
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className={`h-1.5 rounded-full ${(order.status || 'confirmed') === 'delivered' ? 'bg-[#3c4433]' : 'bg-black/10'}`} />
                        <span className={(order.status || 'confirmed') === 'delivered' ? 'text-[#3c4433] font-semibold' : 'text-[#1a1c18]/40'}>
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between text-xs"
                      >
                        <div
                          onClick={() => navigate(`/products/${item.product?.slug || item.productId}`)}
                          className="flex items-center gap-3.5 cursor-pointer group"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-12 h-12 rounded-xl object-cover bg-[#f2f2ef] flex-shrink-0 group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-medium text-[#1a1c18] group-hover:text-[#3c4433] transition-colors">
                              {item.productName}
                            </p>
                            <p className="text-[11px] font-mono text-[#1a1c18]/50">
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

                  {/* Delivery address footer */}
                  <div className="pt-4 border-t border-[rgba(26,28,24,0.06)] text-xs text-[#1a1c18]/60 flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <span>Destination: </span>
                      <strong className="text-[#1a1c18]">
                        {order.shippingAddress.fullName}, {order.shippingAddress.city} ({order.shippingAddress.pincode})
                      </strong>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#757d5c]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Tamper-Proof Box Verified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Invoice Modal Simulation */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#1a1c18]/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="font-serif text-xl text-[#1a1c18]">Tax Invoice</h3>
                  <p className="text-xs font-mono text-[#1a1c18]/60">Invoice #{selectedOrder.id}-INV</p>
                  <p className="text-[11px] text-[#1a1c18]/60">Riyansh Multitrade Pvt. Ltd. (Sangamner)</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-[#1a1c18]/50 hover:text-[#1a1c18]"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs space-y-1">
                <p><strong>Billed To:</strong> {selectedOrder.shippingAddress.fullName}</p>
                <p>{selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.city}</p>
                <p>Phone: {selectedOrder.shippingAddress.phone}</p>
              </div>

              <div className="border-t border-b py-3 space-y-2 text-xs">
                {selectedOrder.items.map((i) => (
                  <div key={i.productId} className="flex justify-between">
                    <span>{i.productName} (x{i.quantity})</span>
                    <span className="font-mono">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs text-right">
                <p>Subtotal: {formatPrice(selectedOrder.subtotal)}</p>
                {selectedOrder.discount > 0 && <p className="text-[#757d5c]">Discount: -{formatPrice(selectedOrder.discount)}</p>}
                <p className="font-bold text-sm text-[#1a1c18]">Total: {formatPrice(selectedOrder.total)}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-[#1a1c18] text-white rounded-full text-xs font-medium"
                >
                  Print Document
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 border rounded-full text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
