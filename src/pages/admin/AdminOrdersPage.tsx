import React, { useState, useMemo } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Order } from '../../types';
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  XCircle,
  Eye,
  ChevronRight,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const {
    orders,
    formatPrice,
    updateOrderStatus,
    cancelOrder,
    addToast
  } = useCommerce();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'processing' | 'in_transit' | 'delivered' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Edit Tracking Modal
  const [editingTrackingOrder, setEditingTrackingOrder] = useState<Order | null>(null);
  const [newCarrier, setNewCarrier] = useState('Bluedart Express');
  const [newAwb, setNewAwb] = useState('');
  const [newEstDate, setNewEstDate] = useState('September 25, 2026');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const currentStatus = order.fulfillmentStatus.toLowerCase().replace(/\s+/g, '_');
      if (statusFilter !== 'all' && currentStatus !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesName = (order.customerName || order.shippingAddress.fullName).toLowerCase().includes(q);
        const matchesEmail = (order.customerEmail || order.shippingAddress.email).toLowerCase().includes(q);
        const matchesAwb = (order.trackingNumber || '').toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesEmail && !matchesAwb) return false;
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const handleOpenTrackingModal = (order: Order) => {
    setEditingTrackingOrder(order);
    setNewCarrier(order.carrier || 'Bluedart Express');
    setNewAwb(order.trackingNumber || `BD-IND-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setNewEstDate(order.estimatedDelivery || 'September 25, 2026');
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrackingOrder) return;
    updateOrderStatus(
      editingTrackingOrder.id,
      'in_transit',
      'In Transit',
      newCarrier,
      newAwb,
      newEstDate
    );
    addToast(`Dispatched ${editingTrackingOrder.id} via ${newCarrier}`, 'success');
    setEditingTrackingOrder(null);
  };

  return (
    <AdminLayout activeTab="orders">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
            FULFILLMENT PIPELINE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
            Orders &amp; Dispatch Center ({orders.length})
          </h1>
          <p className="text-xs text-[#1a1c18]/60 mt-1 font-body">
            Track customer orders, manage courier dispatches, update AWBs, and issue GST tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] text-xs font-mono">
            <span className="text-[#1a1c18]/50">Total Settled: </span>
            <strong className="text-[#1a1c18]">
              {formatPrice(orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0))}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Patron Name, Email, or AWB tracking..."
            className="w-full pl-9 pr-4 py-2 bg-[#f5f4ef] border border-[rgba(26,28,24,0.08)] rounded-2xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'processing', label: 'Processing' },
            { id: 'in_transit', label: 'In Transit' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#3c4433] text-white shadow-xs'
                  : 'bg-[#f2f2ef] text-[#1a1c18]/70 hover:bg-[#e8e8e1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#fbfbf9] border-b border-[rgba(26,28,24,0.08)] text-[10px] font-mono uppercase text-[#1a1c18]/50">
                <th className="py-3.5 px-6 font-semibold">Order ID &amp; Date</th>
                <th className="py-3.5 px-4 font-semibold">Patron &amp; Destination</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Financials</th>
                <th className="py-3.5 px-4 font-semibold">Carrier / AWB</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(26,28,24,0.04)]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#1a1c18]/50">
                    No orders match this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#fbfbf9] transition-colors">
                    {/* Order ID */}
                    <td className="py-4 px-6 font-mono">
                      <div className="font-bold text-[#1a1c18]">{order.id}</div>
                      <div className="text-[10px] text-[#1a1c18]/40">{order.createdAt || order.date}</div>
                    </td>

                    {/* Patron */}
                    <td className="py-4 px-4">
                      <p className="font-medium text-[#1a1c18]">{order.customerName || order.shippingAddress.fullName}</p>
                      <span className="text-[10px] text-[#1a1c18]/50 font-mono block">
                        {order.shippingAddress.city}, {order.shippingAddress.pincode}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4">
                      <span className="font-medium text-[#1a1c18]">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </span>
                      <div className="text-[10px] text-[#1a1c18]/50 truncate max-w-[150px]">
                        {order.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                      </div>
                    </td>

                    {/* Financials */}
                    <td className="py-4 px-4 font-mono">
                      <div className="font-bold text-[#1a1c18]">{formatPrice(order.total)}</div>
                      <div className="text-[10px] text-emerald-700">
                        {order.paymentMethod} • {order.paymentStatus}
                      </div>
                    </td>



                    {/* Tracking details */}
                    <td className="py-4 px-4 text-[11px] font-mono">
                      {order.trackingNumber ? (
                        <div>
                          <div className="font-semibold text-[#3c4433]">{order.carrier || 'Bluedart'}</div>
                          <div className="text-[10px] text-[#1a1c18]/50">{order.trackingNumber}</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenTrackingModal(order)}
                          className="text-[10px] text-[#757d5c] hover:underline font-mono"
                        >
                          + Assign AWB
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenTrackingModal(order)}
                          className="p-1.5 rounded-lg bg-[#f2f2ef] hover:bg-[#e8e8e1] text-[#1a1c18]"
                          title="Update Tracking / Carrier"
                        >
                          <Truck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-[#f2f2ef] hover:bg-[#e8e8e1] text-[#1a1c18]"
                          title="View Invoice & Details"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        {order.fulfillmentStatus !== 'Cancelled' && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700"
                            title="Cancel Order"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EDIT TRACKING MODAL ================= */}
      {editingTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                  COURIER DISPATCH
                </span>
                <h3 className="font-serif text-xl text-[#1a1c18]">
                  Assign AWB: {editingTrackingOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setEditingTrackingOrder(null)}
                className="p-1 text-[#1a1c18]/50 hover:text-[#1a1c18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTracking} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Courier Carrier
                </label>
                <select
                  value={newCarrier}
                  onChange={(e) => setNewCarrier(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl focus:outline-none"
                >
                  <option value="Bluedart Express">Bluedart Express</option>
                  <option value="Delhivery Logistics">Delhivery Logistics</option>
                  <option value="DTDC Air Express">DTDC Air Express</option>
                  <option value="India Post SpeedPost">India Post SpeedPost</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  AWB Tracking Number *
                </label>
                <input
                  type="text"
                  value={newAwb}
                  onChange={(e) => setNewAwb(e.target.value)}
                  required
                  placeholder="E.g., BD-IND-94821094"
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Estimated Delivery Date
                </label>
                <input
                  type="text"
                  value={newEstDate}
                  onChange={(e) => setNewEstDate(e.target.value)}
                  placeholder="September 24, 2026"
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTrackingOrder(null)}
                  className="flex-1 py-2.5 border rounded-full text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium shadow-xs"
                >
                  Save &amp; Mark Dispatched
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= TAX INVOICE MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl border">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                  OFFICIAL TAX INVOICE
                </span>
                <h3 className="font-serif text-2xl text-[#1a1c18]">Invoice #{selectedOrder.id}-INV</h3>
                <p className="text-xs font-mono text-[#1a1c18]/50 mt-0.5">Riyansh Multitrade Pvt. Ltd. (Sangamner)</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-[#1a1c18]/50 hover:text-[#1a1c18]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-[#f5f4ef] p-3 rounded-2xl">
                <span className="font-mono text-[10px] uppercase text-[#1a1c18]/50 block">Dispatched To</span>
                <p className="font-bold text-[#1a1c18]">{selectedOrder.shippingAddress.fullName}</p>
                <p>{selectedOrder.shippingAddress.addressLine1}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                <p className="font-mono text-[11px] mt-1">{selectedOrder.shippingAddress.phone}</p>
              </div>

              <div className="space-y-1 bg-[#f5f4ef] p-3 rounded-2xl font-mono text-[11px]">
                <span className="text-[10px] uppercase text-[#1a1c18]/50 block">Logistics Info</span>
                <p>Status: <strong>{selectedOrder.fulfillmentStatus}</strong></p>
                <p>Carrier: {selectedOrder.carrier || 'Bluedart'}</p>
                <p>AWB: {selectedOrder.trackingNumber || 'Pending'}</p>
                <p>Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
              </div>
            </div>

            <div className="border-t border-b py-3 space-y-2 text-xs">
              <span className="font-mono text-[10px] uppercase text-[#1a1c18]/50 block">Formulations Ordered</span>
              {selectedOrder.items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center py-1">
                  <div>
                    <span className="font-medium text-[#1a1c18]">{item.productName}</span>
                    <span className="text-[10px] text-[#1a1c18]/50 block font-mono">Qty: {item.quantity} • {item.volume}</span>
                  </div>
                  <span className="font-mono font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs text-right font-mono">
              <div className="flex justify-between text-[#1a1c18]/70">
                <span>Subtotal:</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-[#757d5c]">
                  <span>Discount Applied:</span>
                  <span>-{formatPrice(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#1a1c18]/70">
                <span>Express Shipping:</span>
                <span>{selectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedOrder.shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1a1c18] pt-2 border-t">
                <span>Net Payable:</span>
                <span>{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#1a1c18] text-white rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
              >
                Print Invoice PDF
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2.5 border rounded-full text-xs font-medium hover:bg-[#f2f2ef]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
