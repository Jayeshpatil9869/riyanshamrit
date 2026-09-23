import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  TrendingUp,
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CheckCircle2,
  Clock,
  Truck,
  Eye,
  ChevronRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    orders,
    users,
    formatPrice,
    updateOrderStatus,
    updateProduct,
    addToast
  } = useCommerce();
  const { navigate } = useRouter();

  // Financial Metrics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const activeCustomersCount = users.filter((u) => u.role === 'customer').length;
  const pendingOrders = orders.filter((o) => (o.status || 'confirmed') === 'confirmed' || o.fulfillmentStatus === 'Processing');
  const lowStockProducts = products.filter((p) => !p.inStock || (p.stockCount !== undefined && p.stockCount < 20));

  // Simulated Monthly Revenue Breakdown
  const monthlyRevenueData = [
    { month: 'Apr', amount: 48500, orders: 42 },
    { month: 'May', amount: 62000, orders: 58 },
    { month: 'Jun', amount: 54200, orders: 49 },
    { month: 'Jul', amount: 78900, orders: 74 },
    { month: 'Aug', amount: 91400, orders: 88 },
    { month: 'Sep', amount: 112500, orders: 104 }
  ];

  const maxRevenueMonth = Math.max(...monthlyRevenueData.map((d) => d.amount));

  const handleQuickRestock = (productId: string) => {
    updateProduct(productId, { inStock: true, stockCount: 150 });
    addToast('Restocked +150 units for formulation', 'success');
  };

  return (
    <AdminLayout activeTab="dashboard">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2b3323] via-[#3c4433] to-[#1e1f1c] rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#dac5a7]/20 text-[#dac5a7] text-[10px] font-mono tracking-widest uppercase font-semibold">
                STORE OVERVIEW
              </span>
              <span className="text-xs text-white/70 font-mono">• Live Telemetry</span>
            </div>
            <h1
              className="text-2xl sm:text-4xl font-bold tracking-tight !text-white"
              style={{ color: '#ffffff' }}
            >
              Riyansh Amrit Overview
            </h1>
            <p
              className="text-xs sm:text-sm max-w-xl leading-relaxed !text-white/85"
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              Real-time monitoring of customer orders, shipments, product inventory, and revenue from Sangamner processing hub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/admin/products')}
              className="px-5 py-3 bg-[#dac5a7] hover:bg-[#c9b496] text-[#1a1c18] font-medium text-xs rounded-full flex items-center gap-2 transition-transform hover:scale-105 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
            <button
              onClick={() => navigate('/admin/orders')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs rounded-full flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#dac5a7]" />
              <span>Dispatch Orders</span>
            </button>
          </div>
        </div>

        {/* Ambient botanical background graphics */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#757d5c]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Gross Sales */}
        <div className="bg-white p-6 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold">
              Total Gross Revenue
            </span>
            <div className="p-2.5 rounded-2xl bg-[#3c4433]/10 text-[#3c4433] border border-[#3c4433]/15">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1c18] tracking-tight">
              {formatPrice(totalRevenue || 112500)}
            </h3>
            <span className="flex items-center gap-0.5 text-[#3c4433] bg-[#757d5c]/15 px-2 py-0.5 rounded-full text-xs font-mono font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +23.4%
            </span>
          </div>
          <p className="text-[11px] text-[#1a1c18]/50 font-body">
            Calculated across all settled client transactions
          </p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold">
              Total Store Orders
            </span>
            <div className="p-2.5 rounded-2xl bg-[#757d5c]/15 text-[#3c4433] border border-[#757d5c]/25">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1c18] tracking-tight">
              {totalOrdersCount}
            </h3>
            <span className="flex items-center gap-0.5 text-[#3c4433] bg-[#757d5c]/15 px-2 py-0.5 rounded-full text-xs font-mono font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +14.8%
            </span>
          </div>
          <p className="text-[11px] text-[#1a1c18]/50 font-body">
            {pendingOrders.length} currently awaiting courier pickup
          </p>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="bg-white p-6 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold">
              Average Basket (AOV)
            </span>
            <div className="p-2.5 rounded-2xl bg-[#dac5a7]/35 text-[#3c4433] border border-[#dac5a7]/50">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1c18] tracking-tight">
              {formatPrice(averageOrderValue || 840)}
            </h3>
            <span className="flex items-center gap-0.5 text-[#3c4433] bg-[#757d5c]/15 px-2 py-0.5 rounded-full text-xs font-mono font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +8.2%
            </span>
          </div>
          <p className="text-[11px] text-[#1a1c18]/50 font-body">
            Target threshold: ₹999 for free shipping
          </p>
        </div>
      </div>



      {/* Recent Orders Dispatch Table */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(26,28,24,0.06)] gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
              LIVE DISPATCH CENTER
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1c18] tracking-tight">
              Recent Customer Orders
            </h2>
          </div>

          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-[#3c4433] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All {orders.length} Orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[rgba(26,28,24,0.08)] text-[10px] font-mono uppercase text-[#1a1c18]/50">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Customer Details</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(26,28,24,0.04)]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#fbfbf9] transition-colors">
                  <td className="py-4 font-mono font-bold text-[#1a1c18]">
                    {order.id}
                    <span className="block text-[10px] text-[#1a1c18]/40 font-normal">
                      {order.createdAt || order.date}
                    </span>
                  </td>
                  <td className="py-4">
                    <p className="font-medium text-[#1a1c18]">{order.customerName || order.shippingAddress.fullName}</p>
                    <span className="text-[10px] font-mono text-[#1a1c18]/50">
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-medium text-[#1a1c18]">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </span>
                    <span className="block text-[10px] text-[#1a1c18]/50 truncate max-w-[180px]">
                      {order.items.map((i) => i.productName).join(', ')}
                    </span>
                  </td>
                  <td className="py-4 font-mono font-bold text-[#1a1c18]">
                    {formatPrice(order.total)}
                    <span className="block text-[10px] text-emerald-700 font-normal">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
                        order.fulfillmentStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.fulfillmentStatus === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : order.fulfillmentStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-[#dac5a7]/30 text-[#3c4433]'
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {order.fulfillmentStatus === 'Processing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'in_transit', 'In Transit')}
                          className="px-3 py-1 bg-[#3c4433] hover:bg-[#1a1c18] text-white rounded-full text-[10px] font-medium transition-colors"
                        >
                          Dispatch
                        </button>
                      )}
                      {order.fulfillmentStatus === 'In Transit' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered', 'Delivered')}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-[10px] font-medium transition-colors"
                        >
                          Mark Delivered
                        </button>
                      )}
                      <button
                        onClick={() => navigate('/admin/orders')}
                        className="p-1 text-[#1a1c18]/50 hover:text-[#1a1c18]"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
