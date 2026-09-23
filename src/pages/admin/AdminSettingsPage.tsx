import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  Settings,
  Save,
  Bell,
  Truck,
  Shield,
  Phone,
  Mail,
  Store,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { storeSettings, updateStoreSettings, formatPrice, addToast } = useCommerce();

  const [announcementText, setAnnouncementText] = useState(storeSettings.announcementText);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(storeSettings.isAnnouncementActive);
  const [marqueeSpeed, setMarqueeSpeed] = useState(storeSettings.marqueeSpeed);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(storeSettings.freeShippingThreshold);
  const [supportEmail, setSupportEmail] = useState(storeSettings.supportEmail);
  const [supportPhone, setSupportPhone] = useState(storeSettings.supportPhone);
  const [storeName, setStoreName] = useState(storeSettings.storeName);
  const [maintenanceMode, setMaintenanceMode] = useState(storeSettings.maintenanceMode);
  const [taxRatePercent, setTaxRatePercent] = useState(storeSettings.taxRatePercent);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      announcementText,
      isAnnouncementActive,
      marqueeSpeed,
      freeShippingThreshold,
      supportEmail,
      supportPhone,
      storeName,
      maintenanceMode,
      taxRatePercent
    });
    addToast('Storefront configurations published', 'success');
  };

  return (
    <AdminLayout activeTab="settings">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
            STOREFRONT CONFIGURATIONS
          </span>
          <h1 className="font-bold text-2xl sm:text-3xl text-[#1a1c18] tracking-tight">
            Dispensary &amp; Checkout Settings
          </h1>
          <p className="text-xs text-[#1a1c18]/60 mt-1">
            Manage global announcement marquee, shipping fee thresholds, GST rates, and customer support channels.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-6 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4 text-[#dac5a7]" />
          <span>Save Configurations</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Announcement Bar */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(26,28,24,0.06)]">
            <Bell className="w-4 h-4 text-[#757d5c]" />
            <h3 className="font-bold text-lg text-[#1a1c18] tracking-tight">Global Announcement Bar &amp; Ticker</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Announcement Marquee Text
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Complimentary Pan-India Express Delivery..."
                className="w-full px-4 py-2.5 bg-[#f5f4ef] border border-[rgba(26,28,24,0.12)] rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer bg-[#fbfbf9] p-3 rounded-2xl border">
                <input
                  type="checkbox"
                  checked={isAnnouncementActive}
                  onChange={(e) => setIsAnnouncementActive(e.target.checked)}
                  className="rounded text-[#3c4433]"
                />
                <span className="font-medium text-[#1a1c18]">Display Top Banner on Storefront</span>
              </label>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Ticker Scroll Speed (Seconds)
                </label>
                <input
                  type="number"
                  value={marqueeSpeed}
                  onChange={(e) => setMarqueeSpeed(Number(e.target.value))}
                  min={10}
                  max={60}
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Shipping & Tax Thresholds */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(26,28,24,0.06)]">
            <Truck className="w-4 h-4 text-[#757d5c]" />
            <h3 className="font-bold text-lg text-[#1a1c18] tracking-tight">Shipping &amp; Cart Thresholds</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Free Express Delivery Qualifying Minimum (INR ₹)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                min={0}
                className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono"
              />
              <span className="text-[10px] text-[#1a1c18]/50 mt-1 block">
                Carts exceeding {formatPrice(freeShippingThreshold)} will receive automatic zero-fee shipping at checkout.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                GST / Applicable Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRatePercent}
                onChange={(e) => setTaxRatePercent(Number(e.target.value))}
                min={0}
                max={28}
                className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono"
              />
              <span className="text-[10px] text-[#1a1c18]/50 mt-1 block">
                Ayurvedic formulations typically fall under standard 12% GST bracket.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Store Identity */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(26,28,24,0.06)]">
            <Store className="w-4 h-4 text-[#757d5c]" />
            <h3 className="font-bold text-lg text-[#1a1c18] tracking-tight">Store Identity &amp; Support Channels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Support Email Address
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Support WhatsApp / Helpline
              </label>
              <input
                type="tel"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="rounded text-amber-600"
              />
              <span>Enable Storefront Maintenance Mode (Restricts guest checkout temporarily)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white font-medium text-xs rounded-full shadow-md transition-colors"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
