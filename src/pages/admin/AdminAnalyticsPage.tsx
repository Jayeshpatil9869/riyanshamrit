import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  CreditCard,
  PieChart,
  ShoppingBag,
  Leaf,
  Globe,
  ArrowUpRight
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { formatPrice, orders, products } = useCommerce();

  const categoryDistribution = [
    { name: 'Serums & Elixirs', percentage: 42, color: 'bg-[#3c4433]', revenue: 148500 },
    { name: 'Cleansers & Bars', percentage: 24, color: 'bg-[#757d5c]', revenue: 84900 },
    { name: 'Moisturizers & Creams', percentage: 18, color: 'bg-[#dac5a7]', revenue: 63600 },
    { name: 'Body Oils & Mist', percentage: 11, color: 'bg-[#1e1f1c]', revenue: 38800 },
    { name: 'Discovery Travel Kits', percentage: 5, color: 'bg-[#dbdbd1]', revenue: 17600 }
  ];

  const regionalDispatches = [
    { state: 'Maharashtra (Mumbai, Pune, Sangamner, Nashik)', orders: 342, percentage: 48 },
    { state: 'Delhi NCR (Gurugram, Noida, New Delhi)', orders: 156, percentage: 22 },
    { state: 'Karnataka (Bengaluru, Mysuru)', orders: 98, percentage: 14 },
    { state: 'Gujarat (Ahmedabad, Surat, Vadodara)', orders: 64, percentage: 9 },
    { state: 'Tamil Nadu & Kerala (Chennai, Kochi)', orders: 49, percentage: 7 }
  ];

  const paymentMethodsSplit = [
    { method: 'UPI (PhonePe, Google Pay, BHIM)', count: 480, percentage: 68 },
    { method: 'Credit / Debit Cards (Visa, Mastercard, RuPay)', count: 142, percentage: 20 },
    { method: 'Net Banking (HDFC, ICICI, SBI)', count: 56, percentage: 8 },
    { method: 'Cash on Delivery (Verified Pin Codes)', count: 28, percentage: 4 }
  ];

  return (
    <AdminLayout activeTab="analytics">
      {/* Header */}
      <div className="pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
          REVENUE &amp; PATRON INTELLIGENCE
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
          Store Analytics &amp; Reports
        </h1>
        <p className="text-xs text-[#1a1c18]/60 mt-1 font-body">
          Breakdown of formulation demand, territorial logistics dispatch, and gateway conversion metrics.
        </p>
      </div>

      {/* Grid: Category distribution & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Share */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,28,24,0.06)]">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#757d5c]" />
              <h3 className="font-serif text-xl text-[#1a1c18]">Revenue by Formulation Line</h3>
            </div>
            <span className="text-[10px] font-mono text-[#1a1c18]/50 uppercase">FY 2026</span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-[#f2f2ef]">
            {categoryDistribution.map((cat) => (
              <div
                key={cat.name}
                style={{ width: `${cat.percentage}%` }}
                className={`${cat.color} h-full transition-all`}
                title={`${cat.name}: ${cat.percentage}%`}
              />
            ))}
          </div>

          <div className="space-y-3">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-md ${cat.color}`} />
                  <span className="font-medium text-[#1a1c18]">{cat.name}</span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-[#1a1c18]/50">{cat.percentage}%</span>
                  <strong className="text-[#1a1c18]">{formatPrice(cat.revenue)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Gateways Split */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,28,24,0.06)]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#757d5c]" />
              <h3 className="font-serif text-xl text-[#1a1c18]">Payment Gateways Split</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
              98.4% Success Rate
            </span>
          </div>

          <p className="text-xs text-[#1a1c18]/60">
            UPI is the dominant payment vehicle for wellness patron checkouts across India.
          </p>

          <div className="space-y-4">
            {paymentMethodsSplit.map((pm) => (
              <div key={pm.method} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#1a1c18] font-medium">{pm.method}</span>
                  <span className="font-bold text-[#3c4433]">{pm.percentage}% ({pm.count} txns)</span>
                </div>
                <div className="w-full h-2 bg-[#f2f2ef] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${pm.percentage}%` }}
                    className="h-full bg-[#3c4433] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Dispatch Territory Breakdown */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,28,24,0.06)]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#757d5c]" />
            <h3 className="font-serif text-xl text-[#1a1c18]">Top Dispatch Destinations</h3>
          </div>
          <span className="text-[10px] font-mono text-[#1a1c18]/50 uppercase">Pan-India Express</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionalDispatches.map((reg, idx) => (
            <div
              key={reg.state}
              className="p-4 rounded-2xl bg-[#fbfbf9] border border-[rgba(26,28,24,0.06)] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#757d5c] font-bold">Rank #{idx + 1}</span>
                <span className="bg-[#dac5a7]/30 text-[#3c4433] px-2 py-0.5 rounded-full font-bold">
                  {reg.percentage}% Share
                </span>
              </div>
              <p className="font-medium text-[#1a1c18]">{reg.state}</p>
              <span className="text-[10px] font-mono text-[#1a1c18]/50 block">
                {reg.orders} successfully dispatched parcels
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
