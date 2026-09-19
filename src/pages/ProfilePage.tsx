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
  Edit2,
  Sparkles,
  ArrowRight,
  Lock,
  Bell,
  Settings
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
  const [doshaPreference, setDoshaPreference] = useState(user?.doshaPreference || 'Tridoshic');

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
      <div className="w-full pt-28 pb-24">
        <div className="kanva-container max-w-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#e8e8e1] flex items-center justify-center mx-auto text-[#1a1c18]/40 font-serif text-2xl">
            <UserIcon className="w-8 h-8 text-[#757d5c]" />
          </div>
          <h1 className="font-serif text-3xl text-[#1a1c18]">Patron Sign In Required</h1>
          <p className="text-xs text-[#1a1c18]/60 font-body leading-relaxed">
            Please authenticate to access your saved Ayurvedic regimens, delivery addresses, and personal dispensations.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-[#1a1c18] text-white rounded-full text-xs font-medium hover:bg-[#3c4433] transition-colors"
            >
              Sign In to Account
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] rounded-full text-xs font-medium transition-colors"
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
      phone,
      doshaPreference
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine1 || !newCity || !newPincode) {
      addToast('Please complete address details', 'error');
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
      <div className="kanva-container max-w-5xl space-y-8">
        {/* Navigation Breadcrumb / Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[rgba(26,28,24,0.08)] gap-4">
          <div className="flex items-center gap-2">
            <Link
              to="/account/orders"
              className="px-4 py-2 rounded-full text-xs font-medium bg-white border border-[rgba(26,28,24,0.1)] text-[#1a1c18]/70 hover:text-[#1a1c18] transition-colors"
            >
              Order History &amp; Tracking ({orders.length})
            </Link>
            <span className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1a1c18] text-white shadow-xs">
              Patron Profile &amp; Settings
            </span>
          </div>

          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#3c4433] text-[#dac5a7] hover:bg-[#2b3323] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Enter Admin Portal</span>
            </Link>
          )}
        </div>

        {/* Patron Hero Profile Card */}
        <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shadow-md shrink-0 border-2 border-[#dac5a7]/30">
                {user.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#757d5c]/10 text-[#757d5c] font-mono text-[10px] uppercase font-bold tracking-wider">
                    {user.status === 'vip' ? 'VIP Patron Tier' : 'Verified Patron'}
                  </span>
                  {user.role === 'admin' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1a1c18] text-[#dac5a7] font-mono text-[10px] uppercase font-bold">
                      Staff Admin
                    </span>
                  )}
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl text-[#1a1c18]">{user.name}</h1>
                <p className="text-xs text-[#1a1c18]/60 font-mono">{user.email}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-[#f5f4ef] p-4 rounded-2xl border border-[rgba(26,28,24,0.06)] font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Orders</span>
                <strong className="text-sm text-[#1a1c18]">{orders.length}</strong>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div>
                <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Wishlist</span>
                <strong className="text-sm text-[#757d5c]">{wishlist.length}</strong>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div>
                <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Dosha</span>
                <strong className="text-sm text-[#3c4433]">{user.doshaPreference || 'Tridoshic'}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Sidebar Tabs */}
          <div className="bg-white p-3 rounded-2xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#1a1c18] text-white shadow-xs'
                  : 'text-[#1a1c18]/70 hover:bg-[#f2f2ef]'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Personal Details</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#1a1c18] text-white shadow-xs'
                  : 'text-[#1a1c18]/70 hover:bg-[#f2f2ef]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#1a1c18] text-white shadow-xs'
                  : 'text-[#1a1c18]/70 hover:bg-[#f2f2ef]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security &amp; Preferences</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-red-700 hover:bg-red-50 transition-colors cursor-pointer pt-2 border-t"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Tab 1: Personal Details */}
          {activeTab === 'profile' && (
            <div className="md:col-span-3 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-serif text-2xl text-[#1a1c18]">Personal Ayurvedic Profile</h3>
                <p className="text-xs text-[#1a1c18]/60 mt-0.5">
                  Update your contact info and personal Prakriti / Dosha constitution for tailored dispensary consultations.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      Email Address (Read Only)
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-2.5 bg-[#f5f4ef]/60 border rounded-xl text-[#1a1c18]/50 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                      Primary Contact Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Ayurvedic Constitution (Prakriti / Dosha)
                  </label>
                  <select
                    value={doshaPreference}
                    onChange={(e) => setDoshaPreference(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono text-xs"
                  >
                    <option value="Tridoshic">Tridoshic (Balanced Vata, Pitta &amp; Kapha)</option>
                    <option value="Vata">Vata Dominant (Dry skin, seeks calming warming hydration)</option>
                    <option value="Pitta">Pitta Dominant (Sensitive skin, seeks cooling soothing herbs)</option>
                    <option value="Kapha">Kapha Dominant (Oily skin, seeks detoxifying purifying botanicals)</option>
                    <option value="Not Determined">Not Yet Determined</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium shadow-xs transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: Delivery Addresses */}
          {activeTab === 'addresses' && (
            <div className="md:col-span-3 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#1a1c18]">Saved Delivery Locations</h3>
                  <p className="text-xs text-[#1a1c18]/60 mt-0.5">
                    Addresses stored here will be pre-filled automatically during checkout.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#dac5a7]" />
                  <span>Add New</span>
                </button>
              </div>

              {(!user.savedAddresses || user.savedAddresses.length === 0) ? (
                <div className="py-12 text-center text-xs text-[#1a1c18]/50 space-y-3">
                  <MapPin className="w-8 h-8 text-[#757d5c] mx-auto opacity-50" />
                  <p>No saved delivery locations found.</p>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="px-5 py-2 bg-[#1a1c18] text-white rounded-full text-xs"
                  >
                    Add Your Primary Address
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.savedAddresses.map((addr) => (
                    <div
                      key={addr.id || addr.addressLine1}
                      className={`p-5 rounded-2xl border text-xs space-y-3 relative flex flex-col justify-between ${
                        addr.isDefault
                          ? 'border-[#3c4433] bg-[#fbfbf9]'
                          : 'border-[rgba(26,28,24,0.08)] bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono uppercase text-[10px] font-bold text-[#757d5c]">
                            {addr.label || 'Destination'}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-[#3c4433] text-[#dac5a7] rounded-md font-mono text-[9px] font-bold uppercase">
                              Default Address
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-[#1a1c18]">{addr.fullName}</h4>
                        <p className="text-[#1a1c18]/70 leading-relaxed">
                          {addr.addressLine1} {addr.addressLine2 && `, ${addr.addressLine2}`}
                        </p>
                        <p className="text-[#1a1c18]/70">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="font-mono text-[11px] text-[#1a1c18]/50 pt-1">
                          Phone: {addr.phone}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[rgba(26,28,24,0.06)] text-[11px]">
                        {!addr.isDefault && addr.id ? (
                          <button
                            onClick={() => setDefaultAddress(addr.id!)}
                            className="text-[#3c4433] hover:underline font-medium"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[#757d5c] font-medium">Active Default</span>
                        )}

                        {addr.id && (
                          <button
                            onClick={() => deleteSavedAddress(addr.id!)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
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
            <div className="md:col-span-3 bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-serif text-2xl text-[#1a1c18]">Security &amp; Notifications</h3>
                <p className="text-xs text-[#1a1c18]/60 mt-0.5">
                  Manage your patron password credentials and dispatch communication preferences.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#f5f4ef] border space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#757d5c]" />
                    <strong className="text-[#1a1c18]">Account Security</strong>
                  </div>
                  <p className="text-[#1a1c18]/60">
                    Logged in via patron credentials for <strong>{user.email}</strong>.
                  </p>
                  <button
                    onClick={() => addToast('Password reset link sent to your email', 'info')}
                    className="mt-1 text-xs text-[#3c4433] font-semibold hover:underline"
                  >
                    Request Password Reset Link
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5f4ef] border space-y-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#757d5c]" />
                    <strong className="text-[#1a1c18]">Dispatch Alerts</strong>
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#3c4433]" />
                    <span>Send SMS / WhatsApp dispatch tracking updates</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#3c4433]" />
                    <span>Receive new Ayurvedic harvest &amp; formulation announcements</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= ADD ADDRESS MODAL ================= */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border">
            <div className="flex items-start justify-between border-b pb-3">
              <h3 className="font-serif text-xl text-[#1a1c18]">Add Delivery Address</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="p-1 text-[#1a1c18]/50">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                    Label
                  </label>
                  <select
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl"
                  >
                    <option value="Home">Home</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    required
                    placeholder="+91 98..."
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                  Street Address Line 1 *
                </label>
                <input
                  type="text"
                  value={newAddressLine1}
                  onChange={(e) => setNewAddressLine1(e.target.value)}
                  required
                  placeholder="Flat, House No., Building, Street"
                  className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                    placeholder="City"
                    className="w-full px-2.5 py-2 bg-[#f5f4ef] border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#f5f4ef] border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#1a1c18]/70 block mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    required
                    placeholder="422605"
                    className="w-full px-2.5 py-2 bg-[#f5f4ef] border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="flex-1 py-2.5 border rounded-full text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium shadow-xs"
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
