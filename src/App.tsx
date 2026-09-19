/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CommerceProvider } from './context/CommerceContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { PageTransition } from './components/motion/PageTransition';

// Route Pages
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderSuccessPage, OrderFailurePage, OrderPendingPage } from './pages/OrderStatusPages';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage, SignupPage, GoogleCallbackPage } from './pages/AuthPages';
import { ShippingPolicyPage, RefundPolicyPage, PrivacyPolicyPage, TermsPage } from './pages/PolicyPages';

// Admin Suite Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';

const AppContent: React.FC = () => {
  const { currentPath, isProductDetail } = useRouter();

  const isAdminRoute = currentPath.startsWith('/admin');

  const renderActiveRoute = () => {
    if (isProductDetail) {
      return <ProductDetailPage />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/store':
        return <StorePage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/cart':
        return <CartPage />;
      case '/wishlist':
        return <WishlistPage />;
      case '/checkout':
        return <CheckoutPage />;
      case '/checkout/payment':
        return <PaymentPage />;
      case '/orders/success':
        return <OrderSuccessPage />;
      case '/orders/failure':
        return <OrderFailurePage />;
      case '/orders/pending':
        return <OrderPendingPage />;
      case '/account/orders':
        return <OrdersPage />;
      case '/account/profile':
        return <ProfilePage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignupPage />;
      case '/auth/google/callback':
        return <GoogleCallbackPage />;
      case '/shipping':
        return <ShippingPolicyPage />;
      case '/cancellation-refund':
        return <RefundPolicyPage />;
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;

      // Admin Suite Routes
      case '/admin':
      case '/admin/dashboard':
        return <AdminDashboardPage />;
      case '/admin/products':
        return <AdminProductsPage />;
      case '/admin/orders':
        return <AdminOrdersPage />;
      case '/admin/customers':
        return <AdminCustomersPage />;
      case '/admin/coupons':
        return <AdminCouponsPage />;
      case '/admin/analytics':
        return <AdminAnalyticsPage />;
      case '/admin/settings':
        return <AdminSettingsPage />;
      case '/admin/activity':
        return <AdminActivityPage />;

      default:
        return <HomePage />;
    }
  };

  // Dedicated Admin layout container without client header/footer clutter
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#f5f4ef] text-[#1a1c18] font-sans antialiased selection:bg-[#dac5a7] selection:text-[#1a1c18]">
        {renderActiveRoute()}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2ef] text-[#1a1c18] font-sans antialiased selection:bg-[#dac5a7] selection:text-[#1a1c18]">
      {/* Sticky Blurred Global Navigation */}
      <Navbar />

      {/* Main Routed Page Content (Opaque curtain with peel shadow above fixed footer) */}
      <main className="flex-1 w-full relative z-10 min-h-screen bg-[#f2f2ef] shadow-[0_30px_60px_rgba(0,0,0,0.14)]">
        <PageTransition>
          {renderActiveRoute()}
        </PageTransition>
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />

      {/* Curtain Footer Reveal */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CommerceProvider>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </CommerceProvider>
    </RouterProvider>
  );
}
