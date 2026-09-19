import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Coupon } from '../../types';
import {
  Tag,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Percent,
  DollarSign,
  Trash2,
  Edit2,
  X,
  Sparkles
} from 'lucide-react';

export const AdminCouponsPage: React.FC = () => {
  const {
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCoupon,
    formatPrice,
    addToast
  } = useCommerce();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState(10);
  const [minSpend, setMinSpend] = useState(500);
  const [maxUses, setMaxUses] = useState(500);
  const [expiryDate, setExpiryDate] = useState('2027-12-31');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setCode('');
    setDiscountType('percentage');
    setValue(10);
    setMinSpend(500);
    setMaxUses(500);
    setExpiryDate('2027-12-31');
    setDescription('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cpn: Coupon) => {
    setEditingCoupon(cpn);
    setCode(cpn.code);
    setDiscountType(cpn.discountType);
    setValue(cpn.value);
    setMinSpend(cpn.minSpend);
    setMaxUses(cpn.maxUses || 500);
    setExpiryDate(cpn.expiryDate || '2027-12-31');
    setDescription(cpn.description);
    setIsActive(cpn.isActive);
    setIsModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || value <= 0) {
      addToast('Please provide a valid coupon code and discount value', 'error');
      return;
    }

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, {
        code: code.trim().toUpperCase(),
        discountType,
        value,
        minSpend,
        maxUses,
        expiryDate,
        description: description || `${discountType === 'percentage' ? value + '%' : '₹' + value} off on orders above ₹${minSpend}`,
        isActive
      });
      addToast(`Updated promo code ${code.toUpperCase()}`, 'success');
    } else {
      addCoupon({
        code: code.trim().toUpperCase(),
        discountType,
        value,
        minSpend,
        maxUses,
        expiryDate,
        description: description || `${discountType === 'percentage' ? value + '%' : '₹' + value} off on orders above ₹${minSpend}`,
        isActive
      });
      addToast(`Promo code ${code.toUpperCase()} is now active`, 'success');
    }

    setIsModalOpen(false);
  };

  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout activeTab="coupons">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
            PATRON INCENTIVES
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
            Discounts &amp; Promotional Codes ({coupons.length})
          </h1>
          <p className="text-xs text-[#1a1c18]/60 mt-1 font-body">
            Create percentage-based or flat rupee discounts, enforce minimum cart requirements, and control coupon lifecycles.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#dac5a7]" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((cpn) => (
          <div
            key={cpn.id}
            className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold tracking-wider text-[#1a1c18] bg-[#f5f4ef] px-3 py-1 rounded-xl border border-[rgba(26,28,24,0.08)]">
                    {cpn.code}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                      cpn.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {cpn.isActive ? 'Active' : 'Paused'}
                  </span>
                </div>
                <p className="text-xs text-[#1a1c18]/70 mt-2 font-body leading-relaxed">
                  {cpn.description}
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#3c4433] text-[#dac5a7] font-serif font-bold text-sm shrink-0">
                {cpn.discountType === 'percentage' ? `${cpn.value}%` : `₹${cpn.value}`}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 bg-[#f5f4ef] p-3 rounded-2xl text-[11px] font-mono">
              <div>
                <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Min Cart Spend</span>
                <strong className="text-[#1a1c18]">{formatPrice(cpn.minSpend)}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Total Redemptions</span>
                <strong className="text-[#757d5c]">{cpn.usageCount} uses</strong>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[rgba(26,28,24,0.06)] text-xs">
              <span className="text-[10px] font-mono text-[#1a1c18]/50">
                Expires: {cpn.expiryDate || 'Ongoing'}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleCoupon(cpn.id)}
                  className="px-3 py-1 bg-[#f2f2ef] hover:bg-[#e8e8e1] rounded-full text-[11px] font-medium text-[#1a1c18]"
                >
                  {cpn.isActive ? 'Pause' : 'Activate'}
                </button>
                <button
                  onClick={() => handleOpenEdit(cpn)}
                  className="p-1.5 rounded-lg hover:bg-[#f2f2ef] text-[#1a1c18]/70"
                  title="Edit Coupon"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCoupon(cpn.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                  PROMO CODE CREATOR
                </span>
                <h3 className="font-serif text-xl text-[#1a1c18]">
                  {editingCoupon ? `Edit: ${editingCoupon.code}` : 'New Discount Code'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#1a1c18]/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Coupon Code (Uppercase) *
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                  placeholder="E.g., DIWALI25"
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono uppercase text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Concession Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupee (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Concession Value *
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Min Order Spend (₹)
                  </label>
                  <input
                    type="number"
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    min={0}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Description / Patron Terms
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., 15% concession on seasonal botanical formulations"
                  className="w-full px-3.5 py-2 bg-[#f5f4ef] border rounded-xl"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-[#3c4433]"
                />
                <span>Active for checkout redemptions immediately</span>
              </label>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border rounded-full text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium shadow-xs"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
