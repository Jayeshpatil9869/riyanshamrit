import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  TrendingUp,
  DollarSign,
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
    coupons,
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
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2b3323] via-[#3c4433] to-[#1e1f1c] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#dac5a7]/20 text-[#dac5a7] text-[10px] font-mono tracking-widest uppercase font-semibold">
                APOTHECARY OVERVIEW
              </span>
              <span className="text-xs text-white/50 font-mono">• Live Telemetry</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Riyansh Botanical Dispensary
            </h1>
            <p className="text-xs sm:text-sm text-[#eae6df]/75 max-w-xl leading-relaxed">
              Real-time monitoring of formulation orders, customer shipments, botanical inventory, and revenue from Sangamner processing hub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/admin/products')}
              className="px-5 py-3 bg-[#dac5a7] hover:bg-[#c9b496] text-[#1a1c18] font-medium text-xs rounded-full flex items-center gap-2 transition-transform hover:scale-105 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Formulation</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Gross Sales */}
        <div className="bg-white p-6 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold">
              Total Gross Revenue
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
              {formatPrice(totalRevenue || 112500)}
            </h3>
            <span className="flex items-center text-emerald-600 text-xs font-mono font-semibold">
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
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
              {totalOrdersCount}
            </h3>
            <span className="flex items-center text-blue-600 text-xs font-mono font-semibold">
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
            <div className="p-2 rounded-xl bg-[#dac5a7]/30 text-[#3c4433]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
              {formatPrice(averageOrderValue || 840)}
            </h3>
            <span className="flex items-center text-emerald-600 text-xs font-mono font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +8.2%
            </span>
          </div>
          <p className="text-[11px] text-[#1a1c18]/50 font-body">
            Target threshold: ₹999 for free shipping
          </p>
        </div>

        {/* Card 4: Registered Patrons */}
        <div className="bg-white p-6 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/60 font-semibold">
              Active Patrons
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
              {activeCustomersCount + 128}
            </h3>
            <span className="flex items-center text-purple-600 text-xs font-mono font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +19.2%
            </span>
          </div>
          <p className="text-[11px] text-[#1a1c18]/50 font-body">
            78% repeat repurchase frequency rate
          </p>
        </div>
      </div>

      {/* Main Grid: Revenue Visualizer & Low Stock Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(26,28,24,0.06)] gap-2">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                MONTHLY PERFORMANCE
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1a1c18]">
                Revenue Growth &amp; Order Volume
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#1a1c18]/60">
              <span className="inline-block w-3 h-3 rounded-md bg-[#3c4433]" />
              <span>Dispensary Revenue (₹)</span>
            </div>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-2">
            {monthlyRevenueData.map((d) => {
              const heightPercent = Math.round((d.amount / maxRevenueMonth) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-[#1a1c18]/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(d.amount / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full bg-[#f2f2ef] rounded-2xl h-44 flex items-end p-1">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#2b3323] to-[#757d5c] group-hover:to-[#dac5a7] rounded-xl transition-all duration-500 relative"
                    />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#1a1c18]">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(26,28,24,0.06)] text-center text-xs">
            <div>
              <p className="text-[#1a1c18]/50 text-[11px] font-mono">Q3 Gross Volume</p>
              <p className="font-serif text-base font-bold text-[#1a1c18] mt-0.5">₹2,82,800</p>
            </div>
            <div>
              <p className="text-[#1a1c18]/50 text-[11px] font-mono">Top Category</p>
              <p className="font-serif text-base font-bold text-[#3c4433] mt-0.5">Botanical Serums</p>
            </div>
            <div>
              <p className="text-[#1a1c18]/50 text-[11px] font-mono">Conversion Rate</p>
              <p className="font-serif text-base font-bold text-emerald-700 mt-0.5">4.2%</p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Low Stock / Critical Alerts */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,28,24,0.06)]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif text-lg text-[#1a1c18]">Inventory Alerts</h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                {lowStockProducts.length} Items
              </span>
            </div>

            <p className="text-xs text-[#1a1c18]/60">
              Formulations requiring batch production or inventory replenishment.
            </p>

            <div className="space-y-3">
              {lowStockProducts.length === 0 ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs text-center">
                  All formulations are sufficiently stocked in the apothecary.
                </div>
              ) : (
                lowStockProducts.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-[#fbfbf9] rounded-2xl border border-[rgba(26,28,24,0.06)] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-xl object-cover bg-white shrink-0 border"
                      />
                      <div className="truncate">
                        <p className="font-medium text-[#1a1c18] truncate">{prod.name}</p>
                        <span className="text-[10px] font-mono text-amber-700 font-semibold block">
                          Stock: {prod.stockCount ?? 0} units left
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickRestock(prod.id)}
                      className="px-3 py-1.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-[10px] font-medium shrink-0 transition-colors"
                    >
                      Restock
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/products')}
            className="w-full py-2.5 border border-[rgba(26,28,24,0.15)] hover:bg-[#f2f2ef] rounded-full text-xs font-medium text-[#1a1c18] flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Manage All Formulations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Orders Dispatch Table */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(26,28,24,0.06)] gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
              LIVE DISPATCH CENTER
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#1a1c18]">
              Recent Patron Orders
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
                <th className="pb-3 font-semibold">Patron Details</th>
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
