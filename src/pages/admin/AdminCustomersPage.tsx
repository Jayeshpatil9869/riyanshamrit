import React, { useState, useMemo } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { User, ShippingAddress } from '../../types';
import {
  Users,
  Search,
  UserPlus,
  Shield,
  Star,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Lock,
  Crown
} from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    updateUserRole,
    updateUserStatus,
    formatPrice,
    addToast
  } = useCommerce();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'customer'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // New Patron Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+91 98');
  const [newRole, setNewRole] = useState<'admin' | 'customer'>('customer');
  const [newDosha, setNewDosha] = useState<User['doshaPreference']>('Tridoshic');

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesPhone = (u.phone || '').includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone) return false;
      }
      return true;
    });
  }, [users, roleFilter, searchQuery]);

  const handleCreatePatron = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      addToast('Please enter full legal name and email address', 'error');
      return;
    }

    addUser({
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      phone: newPhone.trim(),
      role: newRole,
      status: 'active',
      doshaPreference: newDosha,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      savedAddresses: []
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <AdminLayout activeTab="customers">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
            CUSTOMER DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1c18] tracking-tight">
            Customers Directory ({users.length})
          </h1>
          <p className="text-xs text-[#1a1c18]/60 mt-1 font-body">
            Manage registered customers, practitioner accounts, roles (Super Admin / Customer), and VIP tiers.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-[#dac5a7]" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, email, or contact number..."
            className="w-full pl-9 pr-4 py-2 bg-[#f5f4ef] border border-[rgba(26,28,24,0.08)] rounded-2xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
              roleFilter === 'all' ? 'bg-[#3c4433] text-white' : 'bg-[#f2f2ef] text-[#1a1c18]/70 hover:bg-[#e8e8e1]'
            }`}
          >
            All Customers
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
              roleFilter === 'admin' ? 'bg-[#3c4433] text-white' : 'bg-[#f2f2ef] text-[#1a1c18]/70 hover:bg-[#e8e8e1]'
            }`}
          >
            Administrators
          </button>
          <button
            onClick={() => setRoleFilter('customer')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
              roleFilter === 'customer' ? 'bg-[#3c4433] text-white' : 'bg-[#f2f2ef] text-[#1a1c18]/70 hover:bg-[#e8e8e1]'
            }`}
          >
            Store Customers
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#fbfbf9] border-b border-[rgba(26,28,24,0.08)] text-[10px] font-mono uppercase text-[#1a1c18]/50">
                <th className="py-3.5 px-6 font-semibold">Customer Details</th>
                <th className="py-3.5 px-4 font-semibold">Orders &amp; Spend</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Registered</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(26,28,24,0.04)]">
              {filteredUsers.map((user) => (
                <tr key={user.id || user.email} className="hover:bg-[#fbfbf9] transition-colors">
                  {/* Customer Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center font-bold text-sm shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#1a1c18]">{user.name}</p>
                        <span className="text-[10px] font-mono text-[#1a1c18]/50 block">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>





                  {/* Spend & Orders */}
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-[#1a1c18]">
                      {formatPrice(user.totalSpent || 0)}
                    </div>
                    <span className="text-[10px] text-[#1a1c18]/50">
                      {user.totalOrders || 0} orders
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() =>
                        user.id &&
                        updateUserStatus(
                          user.id,
                          user.status === 'vip' ? 'active' : user.status === 'active' ? 'vip' : 'active'
                        )
                      }
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold transition-colors cursor-pointer ${
                        user.status === 'vip'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : user.status === 'suspended'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      {user.status === 'vip' ? '★ VIP Customer' : (user.status || 'Active')}
                    </button>
                  </td>

                  {/* Joined Date */}
                  <td className="py-4 px-4 text-[11px] text-[#1a1c18]/50 font-mono">
                    {user.joinedDate || '2026'}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-lg bg-[#f2f2ef] hover:bg-[#e8e8e1] text-[#1a1c18]"
                        title="View Addresses & Details"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                      {user.role !== 'admin' && user.id && (
                        <button
                          onClick={() => deleteUser(user.id!)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700"
                          title="Remove User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= REGISTER NEW CUSTOMER MODAL ================= */}
      {isAddModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain">
          <div data-lenis-prevent className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border overscroll-contain">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block">
                  CUSTOMER ONBOARDING
                </span>
                <h3 className="text-xl font-bold text-[#1a1c18] tracking-tight">Register New Account</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-[#1a1c18]/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatron} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  placeholder="Jayant Joshi"
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  placeholder="customer@domain.com"
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98224 00000"
                  className="w-full px-3.5 py-2.5 bg-[#f5f4ef] border rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    System Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                    Dosha Constitution
                  </label>
                  <select
                    value={newDosha}
                    onChange={(e) => setNewDosha(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#f5f4ef] border rounded-xl font-mono text-[11px]"
                  >
                    <option value="Tridoshic">Tridoshic (Balanced)</option>
                    <option value="Vata">Vata Dominant</option>
                    <option value="Pitta">Pitta Dominant</option>
                    <option value="Kapha">Kapha Dominant</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 border rounded-full text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium shadow-xs"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= USER DETAILS / ADDRESS DRAWER ================= */}
      {selectedUser && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain">
          <div data-lenis-prevent className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border overscroll-contain">
            <div className="flex items-start justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center text-base font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1c18] tracking-tight">{selectedUser.name}</h3>
                  <span className="text-xs font-mono text-[#1a1c18]/60">{selectedUser.email}</span>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-1 text-[#1a1c18]/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#f5f4ef] p-3.5 rounded-2xl font-mono text-[11px]">
                <div>
                  <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Phone</span>
                  <p className="font-bold text-[#1a1c18]">{selectedUser.phone || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#1a1c18]/50 uppercase block">Dosha Constitution</span>
                  <p className="font-bold text-[#757d5c]">{selectedUser.doshaPreference || 'Tridoshic'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1a1c18] mb-2 tracking-tight">Saved Delivery Addresses</h4>
                {(!selectedUser.savedAddresses || selectedUser.savedAddresses.length === 0) ? (
                  <p className="text-xs text-[#1a1c18]/50 italic">No saved delivery addresses on file.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedUser.savedAddresses.map((addr, idx) => (
                      <div key={idx} className="p-3 border rounded-2xl bg-[#fbfbf9] text-xs space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-[#1a1c18]">
                          <span>{addr.fullName} ({addr.label || 'Primary'})</span>
                          {addr.isDefault && (
                            <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[#1a1c18]/70">{addr.addressLine1}, {addr.city} - {addr.pincode}</p>
                        <p className="font-mono text-[11px] text-[#1a1c18]/50">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 bg-[#1a1c18] text-white rounded-full text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
