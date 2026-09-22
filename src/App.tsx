import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CommerceProvider } from './context/CommerceContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { PageTransition } from './components/motion/PageTransition';

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

import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';

const AdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  const { navigate, currentPath } = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated && currentPath !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, currentPath, navigate]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
};

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

      case '/admin/login':
        return <AdminLoginPage />;
      case '/admin':
      case '/admin/dashboard':
        return (
          <AdminGate>
            <AdminDashboardPage />
          </AdminGate>
        );
      case '/admin/products':
        return (
          <AdminGate>
            <AdminProductsPage />
          </AdminGate>
        );
      case '/admin/orders':
        return (
          <AdminGate>
            <AdminOrdersPage />
          </AdminGate>
        );
      case '/admin/customers':
        return (
          <AdminGate>
            <AdminCustomersPage />
          </AdminGate>
        );
      case '/admin/coupons':
        return (
          <AdminGate>
            <AdminCouponsPage />
          </AdminGate>
        );
      case '/admin/analytics':
        return (
          <AdminGate>
            <AdminAnalyticsPage />
          </AdminGate>
        );
      case '/admin/settings':
        return (
          <AdminGate>
            <AdminSettingsPage />
          </AdminGate>
        );
      case '/admin/activity':
        return (
          <AdminGate>
            <AdminActivityPage />
          </AdminGate>
        );

      default:
        return <HomePage />;
    }
  };

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
      <Navbar />
      <main className="flex-1 w-full relative z-10 min-h-screen bg-[#f2f2ef] shadow-[0_30px_60px_rgba(0,0,0,0.14)]">
        <PageTransition>{renderActiveRoute()}</PageTransition>
      </main>
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CommerceProvider>
        <AdminAuthProvider>
          <SmoothScroll>
            <AppContent />
          </SmoothScroll>
        </AdminAuthProvider>
      </CommerceProvider>
    </RouterProvider>
  );
}
