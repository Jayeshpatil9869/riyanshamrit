import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useCommerce } from '../../context/CommerceContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  BarChart3,
  Settings,
  History,
  Store,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Sparkles,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'products' | 'orders' | 'customers' | 'coupons' | 'analytics' | 'settings' | 'activity';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { navigate } = useRouter();
  const {
    user,
    logout,
    orders,
    products,
    coupons,
    activityLogs,
    loginAsDemoAdmin,
    loginAsDemoPatron
  } = useCommerce();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pendingOrdersCount = orders.filter(
    (o) => (o.status || 'confirmed') === 'confirmed' || o.fulfillmentStatus === 'Processing'
  ).length;

  const lowStockCount = products.filter(
    (p) => !p.inStock || (p.stockCount !== undefined && p.stockCount < 15)
  ).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      badge: null
    },
    {
      id: 'products',
      label: 'Formulations Catalog',
      icon: Package,
      path: '/admin/products',
      badge: lowStockCount > 0 ? `${lowStockCount} alert` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'orders',
      label: 'Orders & Dispatch',
      icon: ShoppingBag,
      path: '/admin/orders',
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} pending` : null,
      badgeColor: 'bg-[#3c4433] text-[#dac5a7]'
    },
    {
      id: 'customers',
      label: 'Patrons & Users',
      icon: Users,
      path: '/admin/customers',
      badge: null
    },
    {
      id: 'coupons',
      label: 'Promos & Coupons',
      icon: Tag,
      path: '/admin/coupons',
      badge: `${coupons.filter((c) => c.isActive).length} active`,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'analytics',
      label: 'Revenue Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
      badge: null
    },
    {
      id: 'settings',
      label: 'Storefront Settings',
      icon: Settings,
      path: '/admin/settings',
      badge: null
    },
    {
      id: 'activity',
      label: 'Audit & Activity Log',
      icon: History,
      path: '/admin/activity',
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#1a1c18] flex flex-col lg:flex-row antialiased font-sans">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 bg-[#1e1f1c] text-[#eae6df] flex-col justify-between shrink-0 border-r border-white/10 z-30 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#3c4433] border border-[#dac5a7]/30 flex items-center justify-center text-[#dac5a7] font-serif font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                RA
              </div>
              <div>
                <span className="font-serif text-lg tracking-wide uppercase font-semibold text-white block">
                  Riyansh Amrit
                </span>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#dac5a7] block">
                  Apothecary Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#dac5a7]/60">
              Management Suite
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3c4433] text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] border border-[#dac5a7]/20 font-semibold'
                      : 'text-[#eae6df]/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#dac5a7]' : 'text-[#eae6df]/50'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.badgeColor || 'bg-white/10 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Storefront & User Card */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* Quick link to live store */}
          <Link
            to="/"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#dac5a7] border border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5" />
              <span>Live Storefront</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>

          {/* Admin user status pill */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center font-serif text-sm font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">{user?.name || 'Administrator'}</p>
                <span className="text-[10px] font-mono text-[#757d5c] block uppercase">
                  {user?.role === 'admin' ? 'Super Admin' : 'Staff Admin'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out"
              className="p-1.5 text-white/50 hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[rgba(26,28,24,0.08)] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Mobile trigger & breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#f2f2ef] text-[#1a1c18] hover:bg-[#eaeae5]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[#757d5c] uppercase text-[11px] font-semibold hidden sm:inline">
                Apothecary Administration
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#1a1c18]/30 hidden sm:inline" />
              <span className="font-medium text-[#1a1c18] capitalize">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Right: Quick actions, notifications, live status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* System Status Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dispensary Live</span>
            </div>

            {/* Quick Demo Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-[#f2f2ef] p-1 rounded-full border border-[rgba(26,28,24,0.08)] text-[11px]">
              <button
                onClick={loginAsDemoAdmin}
                className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                  user?.role === 'admin'
                    ? 'bg-[#1a1c18] text-white shadow-xs'
                    : 'text-[#1a1c18]/60 hover:text-[#1a1c18]'
                }`}
              >
                Admin Mode
              </button>
              <button
                onClick={loginAsDemoPatron}
                className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                  user?.role !== 'admin'
                    ? 'bg-[#1a1c18] text-white shadow-xs'
                    : 'text-[#1a1c18]/60 hover:text-[#1a1c18]'
                }`}
              >
                Patron View
              </button>
            </div>

            {/* Notifications Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-full bg-[#f2f2ef] hover:bg-[#eaeae5] text-[#1a1c18] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {activityLogs.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#757d5c] rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[rgba(26,28,24,0.1)] p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[rgba(26,28,24,0.06)]">
                      <span className="font-serif font-semibold text-sm text-[#1a1c18]">Recent Store Events</span>
                      <button
                        onClick={() => {
                          setIsNotifOpen(false);
                          navigate('/admin/activity');
                        }}
                        className="text-[11px] text-[#757d5c] hover:underline font-mono"
                      >
                        View Full Audit
                      </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-[rgba(26,28,24,0.04)] space-y-1">
                      {activityLogs.slice(0, 5).map((log) => (
                        <div key={log.id} className="py-2 text-xs space-y-0.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <strong className="text-[#1a1c18]">{log.action}</strong>
                            <span className="text-[#1a1c18]/40 font-mono text-[10px]">{log.timestamp}</span>
                          </div>
                          <p className="text-[#1a1c18]/60 text-[11px] leading-relaxed">{log.details}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Back to Client Store Button */}
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1a1c18] hover:bg-[#3c4433] text-white text-xs font-medium rounded-full shadow-xs transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-[#dac5a7]" />
              <span className="hidden xs:inline">Storefront</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Body View */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex"
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-72 bg-[#1e1f1c] text-white h-full p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#3c4433] text-[#dac5a7] flex items-center justify-center font-serif font-bold text-sm">
                      RA
                    </div>
                    <span className="font-serif font-bold text-sm text-white">Riyansh Amrit Admin</span>
                  </div>
                  <button onClick={() => setIsMobileNavOpen(false)} className="p-1 text-white/60">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIsMobileNavOpen(false);
                          navigate(item.path);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#3c4433] text-[#dac5a7] font-semibold'
                            : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-[#dac5a7] flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>Exit to Storefront</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileNavOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-2 text-center text-xs text-red-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
