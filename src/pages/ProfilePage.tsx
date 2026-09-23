import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { ShippingAddress } from '../types';
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  MapPin,
  Shield,
  Phone,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
  Sparkles,
  ArrowRight,
  Lock,
  Bell,
  Check,
  Package,
  ArrowUpRight,
  Crown,
  X
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    formatPrice,
    updateUserProfile,
    addSavedAddress,
    deleteSavedAddress,
    setDefaultAddress,
    logout,
    addToast
  } = useCommerce();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'security'>('profile');

  // Profile Form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98224 88300');

  // New Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newAddressLine1, setNewAddressLine1] = useState('');
  const [newAddressLine2, setNewAddressLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Maharashtra');
  const [newPincode, setNewPincode] = useState('');
  const [newLabel, setNewLabel] = useState('Home');

  // If user is not logged in, show prompt
  if (!user) {
    return (
      <div className="w-full pt-28 pb-24 min-h-[70vh] flex items-center justify-center">
        <div className="kanva-container max-w-md text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#f2f2ef] border border-[rgba(26,28,24,0.08)] flex items-center justify-center mx-auto text-[#1a1c18]/40 shadow-sm">
            <UserIcon className="w-9 h-9 text-[#757d5c]" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-bold block">
              AUTHENTICATION REQUIRED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18]">Sign In Required</h1>
            <p className="text-xs sm:text-sm text-[#1a1c18]/60 font-body leading-relaxed max-w-sm mx-auto">
              Please sign in to access your saved orders, delivery locations, and personalized account preferences.
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Link
              to="/login"
              className="px-7 py-3 bg-[#1a1c18] text-white rounded-full text-xs font-semibold hover:bg-[#3c4433] transition-all shadow-md hover:scale-105"
            >
              Sign In to Account
            </Link>
            <Link
              to="/signup"
              className="px-7 py-3 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] rounded-full text-xs font-semibold transition-all text-[#1a1c18]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine1 || !newCity || !newPincode) {
      addToast('Please complete required address details', 'error');
      return;
    }

    addSavedAddress({
      fullName: newFullName,
      email: newEmail,
      phone: newPhone,
      addressLine1: newAddressLine1,
      addressLine2: newAddressLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      country: 'India',
      label: newLabel,
      isDefault: (user.savedAddresses || []).length === 0
    });

    setIsAddressModalOpen(false);
    setNewAddressLine1('');
    setNewAddressLine2('');
    setNewCity('');
    setNewPincode('');
  };

  return (
    <div className="w-full pt-24 sm:pt-28 lg:pt-32 pb-24">
      <div className="kanva-container max-w-6xl space-y-8">
        
        {/* Top Header & Tab Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[rgba(26,28,24,0.08)] gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1a1c18] text-white shadow-xs">
              My Profile &amp; Settings
            </span>
            <Link
              to="/account/orders"
              className="px-4 py-2 rounded-full text-xs font-medium bg-white border border-[rgba(26,28,24,0.1)] text-[#1a1c18]/70 hover:text-[#1a1c18] hover:border-[#3c4433] transition-all flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5 text-[#757d5c]" />
              <span>Order History &amp; Tracking ({orders.length})</span>
            </Link>
            <Link
              to="/wishlist"
              className="px-4 py-2 rounded-full text-xs font-medium bg-white border border-[rgba(26,28,24,0.1)] text-[#1a1c18]/70 hover:text-[#1a1c18] hover:border-[#3c4433] transition-all flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#757d5c]" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
          </div>

          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#3c4433] text-[#dac5a7] hover:bg-[#2b3323] transition-all flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
            >
              <Shield className="w-3.5 h-3.5 text-[#dac5a7]" />
              <span>Admin Portal</span>
            </Link>
          )}
        </div>

        {/* Section Header */}
        <div>
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-1">
            ACCOUNT &amp; SETTINGS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal">
            Personal Profile &amp; Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[#1a1c18]/60 mt-1 font-body">
            Manage your personal identity, saved shipping destinations, and account security.
          </p>
        </div>

        {/* 2-Column Cohesive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= UNIFIED LEFT SIDEBAR (4 Cols) ================= */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs overflow-hidden">
            
            {/* Profile Header Header Box */}
            <div className="p-6 border-b border-[rgba(26,28,24,0.06)] bg-gradient-to-b from-[#faf9f5] to-white">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center font-serif text-xl font-bold shadow-md border-2 border-[#dac5a7]/40 ring-4 ring-[#dac5a7]/15">
                    {user.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white" title="Verified Customer">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  {user.role === 'admin' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#1a1c18] text-[#dac5a7] font-mono text-[9px] uppercase font-bold">
                        Admin
                      </span>
                    </div>
                  )}
                  <h3 className="font-serif text-lg text-[#1a1c18] font-medium truncate">{user.name}</h3>
                  <p className="text-[11px] text-[#1a1c18]/60 font-mono truncate">{user.email}</p>
                </div>
              </div>

              {/* Quick Summary Pill Row */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[rgba(26,28,24,0.06)]">
                <Link
                  to="/account/orders"
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#f8f8f5] hover:bg-[#f0eee6] transition-colors border border-[rgba(26,28,24,0.05)] text-center group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1a1c18]/50 group-hover:text-[#1a1c18] transition-colors">
                    Orders
                  </span>
                  <span className="text-base font-bold text-[#1a1c18] font-mono">
                    {orders.length}
                  </span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-[#f8f8f5] hover:bg-[#f0eee6] transition-colors border border-[rgba(26,28,24,0.05)] text-center group"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1a1c18]/50 group-hover:text-[#757d5c] transition-colors">
                    Wishlist
                  </span>
                  <span className="text-base font-bold text-[#757d5c] font-mono">
                    {wishlist.length}
                  </span>
                </Link>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="p-4 space-y-1.5">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#757d5c] font-bold">
                Account Navigation
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#1a1c18] text-white shadow-xs'
                    : 'text-[#1a1c18]/70 hover:bg-[#f5f4ef] hover:text-[#1a1c18]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserIcon className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#dac5a7]' : 'text-[#757d5c]'}`} />
                  <span>Personal Details</span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'profile' ? 'opacity-100 translate-x-0.5' : 'opacity-0'}`} />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-[#1a1c18] text-white shadow-xs'
                    : 'text-[#1a1c18]/70 hover:bg-[#f5f4ef] hover:text-[#1a1c18]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${activeTab === 'addresses' ? 'text-[#dac5a7]' : 'text-[#757d5c]'}`} />
                  <span>Delivery Addresses</span>
                </div>
                {(user.savedAddresses || []).length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === 'addresses' ? 'bg-[#dac5a7]/20 text-[#dac5a7]' : 'bg-[#f2f2ef] text-[#1a1c18]/60'}`}>
                    {(user.savedAddresses || []).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-[#1a1c18] text-white shadow-xs'
                    : 'text-[#1a1c18]/70 hover:bg-[#f5f4ef] hover:text-[#1a1c18]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className={`w-4 h-4 ${activeTab === 'security' ? 'text-[#dac5a7]' : 'text-[#757d5c]'}`} />
                  <span>Security &amp; Preferences</span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'security' ? 'opacity-100 translate-x-0.5' : 'opacity-0'}`} />
              </button>

              <Link
                to="/account/orders"
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold text-[#1a1c18]/70 hover:bg-[#f5f4ef] hover:text-[#1a1c18] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-[#757d5c]" />
                  <span>Order History &amp; Tracking</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1a1c18]/40" />
              </Link>

              <div className="pt-2 mt-2 border-t border-[rgba(26,28,24,0.06)]">
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-colors cursor-pointer text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: MAIN WORKSPACE (8 Cols) ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tab 1: Personal Details */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-10 shadow-xs space-y-6">
                <div className="border-b border-[rgba(26,28,24,0.06)] pb-5">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
                    ACCOUNT DETAILS
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">Personal Details</h2>
                  <p className="text-xs text-[#1a1c18]/60 mt-1 leading-relaxed">
                    Update your contact info and personal account details.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-2xl text-xs text-[#1a1c18] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                        Email Address (Read Only)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-[#f2f2ef]/70 border border-[rgba(26,28,24,0.08)] rounded-2xl text-[#1a1c18]/50 cursor-not-allowed font-mono text-xs"
                        />
                      </div>
                      <span className="text-[10px] text-[#757d5c] font-mono mt-1 block">
                        ✓ Verified Account Identifier
                      </span>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                        Primary Contact Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-2xl font-mono text-xs text-[#1a1c18] focus:outline-none transition-all"
                        />
                      </div>
                      <span className="text-[10px] text-[#1a1c18]/40 mt-1 block">
                        Used for dispatch SMS and courier updates.
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[rgba(26,28,24,0.06)] flex items-center justify-between">
                    <p className="text-[11px] text-[#1a1c18]/50 font-body hidden sm:block">
                      All personal details are encrypted and securely stored.
                    </p>
                    <button
                      type="submit"
                      className="px-7 py-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#dac5a7]" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Delivery Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(26,28,24,0.06)] pb-5 gap-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
                      LOGISTICS &amp; SHIPPING
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">Saved Delivery Locations</h2>
                    <p className="text-xs text-[#1a1c18]/60 mt-1">
                      Addresses stored here will be pre-filled automatically during express checkout.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="px-5 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#dac5a7]" />
                    <span>Add Address</span>
                  </button>
                </div>

                {(!user.savedAddresses || user.savedAddresses.length === 0) ? (
                  <div className="py-14 text-center text-xs text-[#1a1c18]/50 space-y-4 bg-[#fbfbf9] rounded-2xl border border-[rgba(26,28,24,0.06)] p-8">
                    <div className="w-14 h-14 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#757d5c]">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#1a1c18]">No delivery addresses saved</h4>
                      <p className="max-w-xs mx-auto text-[11px] text-[#1a1c18]/60">
                        Add your primary residential or clinic location for rapid one-click checkout.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="px-6 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-semibold transition-all shadow-xs"
                    >
                      Add Your Primary Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.savedAddresses.map((addr) => (
                      <div
                        key={addr.id || addr.addressLine1}
                        className={`p-5 rounded-2xl border text-xs space-y-3 relative flex flex-col justify-between transition-all ${
                          addr.isDefault
                            ? 'border-[#3c4433] bg-[#fbfbf9] shadow-xs'
                            : 'border-[rgba(26,28,24,0.08)] bg-white hover:border-[rgba(26,28,24,0.18)]'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono uppercase text-[10px] font-bold text-[#757d5c] bg-[#757d5c]/10 px-2 py-0.5 rounded-md">
                              {addr.label || 'Home'}
                            </span>
                            {addr.isDefault && (
                              <span className="px-2.5 py-0.5 bg-[#3c4433] text-[#dac5a7] rounded-full font-mono text-[9px] font-bold uppercase">
                                Default Location
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-[#1a1c18]">{addr.fullName}</h4>
                          <p className="text-[#1a1c18]/70 leading-relaxed font-body">
                            {addr.addressLine1} {addr.addressLine2 && `, ${addr.addressLine2}`}
                          </p>
                          <p className="text-[#1a1c18]/70 font-medium">
                            {addr.city}, {addr.state} - <span className="font-mono font-bold">{addr.pincode}</span>
                          </p>
                          <p className="font-mono text-[11px] text-[#1a1c18]/50 pt-1 flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-[#757d5c]" />
                            <span>{addr.phone}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[rgba(26,28,24,0.06)] text-[11px]">
                          {!addr.isDefault && addr.id ? (
                            <button
                              onClick={() => setDefaultAddress(addr.id!)}
                              className="text-[#3c4433] hover:underline font-semibold cursor-pointer"
                            >
                              Set as Default
                            </button>
                          ) : (
                            <span className="text-[#757d5c] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Default Destination</span>
                            </span>
                          )}

                          {addr.id && (
                            <button
                              onClick={() => deleteSavedAddress(addr.id!)}
                              className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete location"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Security & Preferences */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-10 shadow-xs space-y-6">
                <div className="border-b border-[rgba(26,28,24,0.06)] pb-5">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
                    DATA &amp; NOTIFICATIONS
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">Security &amp; Notifications</h2>
                  <p className="text-xs text-[#1a1c18]/60 mt-1">
                    Manage your password credentials and order notification preferences.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Account Security Box */}
                  <div className="p-5 rounded-2xl bg-[#fbfbf9] border border-[rgba(26,28,24,0.08)] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#3c4433]/10 text-[#3c4433] flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-sm text-[#1a1c18] block">Account Password</strong>
                          <span className="text-[11px] text-[#1a1c18]/60">
                            Logged in securely as <strong className="font-mono">{user.email}</strong>.
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] font-semibold">
                        256-Bit SSL
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[rgba(26,28,24,0.06)]">
                      <button
                        type="button"
                        onClick={() => addToast('Password reset instructions sent to your email', 'info')}
                        className="text-xs text-[#3c4433] hover:text-[#1a1c18] font-semibold underline cursor-pointer"
                      >
                        Request Password Reset Email Link →
                      </button>
                    </div>
                  </div>

                  {/* Dispatch Alerts Box */}
                  <div className="p-5 rounded-2xl bg-[#fbfbf9] border border-[rgba(26,28,24,0.08)] space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#757d5c]/15 text-[#3c4433] flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-sm text-[#1a1c18] block">Order Notifications &amp; Alerts</strong>
                        <span className="text-[11px] text-[#1a1c18]/60">Configure real-time courier and delivery status channels.</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-white border border-[rgba(26,28,24,0.06)]">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded text-[#3c4433] accent-[#3c4433]" />
                        <div className="space-y-0.5">
                          <span className="font-semibold text-[#1a1c18] block">WhatsApp &amp; SMS Dispatch Updates</span>
                          <span className="text-[11px] text-[#1a1c18]/50 block">Receive real-time airway bill (AWB) and out-for-delivery notifications.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-white border border-[rgba(26,28,24,0.06)]">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded text-[#3c4433] accent-[#3c4433]" />
                        <div className="space-y-0.5">
                          <span className="font-semibold text-[#1a1c18] block">Product Harvest &amp; Seasonal Announcements</span>
                          <span className="text-[11px] text-[#1a1c18]/50 block">Get notified when seasonal Ayurvedic batches are freshly prepared.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ================= ADD ADDRESS MODAL ================= */}
      {isAddressModalOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddressModalOpen(false);
          }}
        >
          <div
            data-lenis-prevent
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[rgba(26,28,24,0.1)] overscroll-contain"
          >
            <div className="flex items-start justify-between border-b border-[rgba(26,28,24,0.08)] pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                  NEW DESTINATION
                </span>
                <h3 className="font-serif text-2xl text-[#1a1c18]">Add Delivery Location</h3>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f2f2ef] text-[#1a1c18]/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                    Address Type
                  </label>
                  <select
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl font-mono text-xs focus:outline-none"
                  >
                    <option value="Home">Home</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    required
                    placeholder="+91 98..."
                    className="w-full px-3 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  required
                  placeholder="E.g., Dr. Ramesh Deshmukh"
                  className="w-full px-3.5 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                  Street Address Line 1 *
                </label>
                <input
                  type="text"
                  value={newAddressLine1}
                  onChange={(e) => setNewAddressLine1(e.target.value)}
                  required
                  placeholder="Flat, House No., Building, Street"
                  className="w-full px-3.5 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                    City *
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                    placeholder="City"
                    className="w-full px-2.5 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                    State *
                  </label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#1a1c18]/70 block mb-1 font-semibold">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    required
                    placeholder="422605"
                    className="w-full px-2.5 py-2.5 bg-[#f8f8f5] border border-[rgba(26,28,24,0.12)] rounded-xl font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="flex-1 py-3 border border-[rgba(26,28,24,0.14)] hover:bg-[#f2f2ef] rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
