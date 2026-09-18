import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  path: string;
  currentPath: string;
  isProductDetail: boolean;
  queryParams: URLSearchParams;
  productSlug: string | null;
  navigate: (to: string, state?: any) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  const updateLocation = useCallback(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      updateLocation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updateLocation]);

  const navigate = useCallback((to: string) => {
    if (typeof window !== 'undefined') {
      if (to !== window.location.pathname + window.location.search) {
        window.history.pushState({}, '', to);
        updateLocation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [updateLocation]);

  const goBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  // Parse path & query
  const [pathname, search] = currentUrl.split('?');
  const queryParams = new URLSearchParams(search || '');

  // Check dynamic product route
  let productSlug: string | null = null;
  if (pathname.startsWith('/products/')) {
    productSlug = pathname.replace('/products/', '').split('/')[0];
  }

  const isProductDetail = Boolean(productSlug);
  const activePath = pathname || '/';

  return (
    <RouterContext.Provider
      value={{
        path: activePath,
        currentPath: activePath,
        isProductDetail,
        queryParams,
        productSlug,
        navigate,
        goBack
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const Link: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
}> = ({ to, className, children, onClick, id }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a id={id} href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
