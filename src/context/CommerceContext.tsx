import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Order, User, Currency, ShippingAddress } from '../types';
import { RIYANSH_PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface CommerceContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedVolume?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orderNote: string;
  setOrderNote: (note: string) => void;
  couponCode: string;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
  shippingFee: number;
  cartTotal: number;

  // Wishlist
  wishlist: WishlistItem[];
  wishlistCount: number;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;

  // Currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInINR: number) => string;

  // Search & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Auth & User
  user: User | null;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  loginWithEmail: (email: string, password?: string) => void;
  loginWithGoogle: () => void;

  // Shipping & Orders
  shippingAddress: ShippingAddress;
  setShippingAddress: (address: ShippingAddress) => void;
  orders: Order[];
  createOrder: (
    optsOrAddress?: { paymentMethod?: string; paymentStatus?: string } | ShippingAddress,
    legacyPaymentMethod?: any
  ) => Order;
  lastOrder: Order | null;

  // Toast
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
};

const SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'RY-ORD-88210',
    date: 'September 12, 2026',
    createdAt: 'Sep 12, 2026',
    items: [
      {
        productId: 'prod-01',
        productName: 'Riyansh Amrit Juice',
        quantity: 2,
        price: 899,
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
        volume: '1000 ml',
        product: RIYANSH_PRODUCTS[0],
        selectedVolume: '1000 ml'
      },
      {
        productId: 'prod-08',
        productName: 'Neem & Aloe Vera Purifying Bar',
        quantity: 3,
        price: 149,
        image: 'https://images.unsplash.com/photo-1607006311600-33471450266f?auto=format&fit=crop&w=800&q=80',
        volume: '125 g',
        product: RIYANSH_PRODUCTS[7],
        selectedVolume: '125 g'
      }
    ],
    shippingAddress: {
      fullName: 'Jayesh B. Patil',
      email: 'jayeshbpatil8830@gmail.com',
      phone: '+91 98224 88300',
      addressLine1: 'Flat 402, Prathamesh Heights, Shivajinagar',
      city: 'Sangamner',
      state: 'Maharashtra',
      pincode: '422605',
      country: 'India'
    },
    subtotal: 2245,
    discount: 225,
    shippingFee: 0,
    total: 2020,
    currency: 'INR',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'in_transit',
    fulfillmentStatus: 'In Transit',
    trackingNumber: 'DTDC-IND-94821094',
    estimatedDelivery: 'September 20, 2026'
  }
];

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { product: RIYANSH_PRODUCTS[0], quantity: 1, selectedVolume: RIYANSH_PRODUCTS[0].volume }
    ];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('AMRIT10');

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { product: RIYANSH_PRODUCTS[1], addedAt: new Date().toISOString() },
      { product: RIYANSH_PRODUCTS[5], addedAt: new Date().toISOString() }
    ];
  });
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  // Currency
  const [currency, setCurrency] = useState<Currency>('INR');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Jayesh Patil',
    email: 'jayeshbpatil8830@gmail.com',
    phone: '+91 98224 88300',
    addressLine1: 'Shivajinagar, Station Road',
    addressLine2: 'Near Sangamner Bus Stand',
    city: 'Sangamner',
    state: 'Maharashtra',
    pincode: '422605',
    country: 'India'
  });

  // User & Auth
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('riyansh_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      id: 'usr-001',
      name: 'Jayesh Patil',
      email: 'jayeshbpatil8830@gmail.com',
      phone: '+91 98224 88300',
      addresses: [
        {
          fullName: 'Jayesh Patil',
          email: 'jayeshbpatil8830@gmail.com',
          phone: '+91 98224 88300',
          addressLine1: 'Shivajinagar, Station Road',
          city: 'Sangamner',
          state: 'Maharashtra',
          pincode: '422605',
          country: 'India'
        }
      ]
    };
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DEMO_ORDERS;
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('riyansh_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('riyansh_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Sync orders
  useEffect(() => {
    try {
      localStorage.setItem('riyansh_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Sync user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('riyansh_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('riyansh_user');
      }
    } catch {}
  }, [user]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (amountInINR: number): string => {
    const rate = RATES[currency];
    const converted = amountInINR * rate;
    const symbol = SYMBOLS[currency];
    if (currency === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 999; // INR
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 99;

  let discountAmount = 0;
  if (appliedCoupon === 'AMRIT10') {
    discountAmount = Math.round(cartSubtotal * 0.1);
  } else if (appliedCoupon === 'HARGHAR') {
    discountAmount = Math.min(cartSubtotal, 150);
  } else if (appliedCoupon === 'WELLNESS') {
    discountAmount = Math.round(cartSubtotal * 0.15);
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'AMRIT10' || normalized === 'HARGHAR' || normalized === 'WELLNESS') {
      setAppliedCoupon(normalized);
      setCouponCode(normalized);
      addToast(`Promo code ${normalized} applied!`, 'success');
      return true;
    }
    addToast('Invalid coupon code. Try AMRIT10 or HARGHAR', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon removed', 'info');
  };

  const addToCart = (product: Product, quantity = 1, selectedVolume?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        { product, quantity, selectedVolume: selectedVolume || product.volume }
      ];
    });
    addToast(`Added ${product.name} to bag`, 'success');
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const wishlistCount = wishlist.length;

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        addToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        addToast(`Saved ${product.name} to wishlist`, 'success');
        return [...prev, { product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Removed from wishlist', 'info');
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast('Wishlist cleared', 'info');
  };

  // Auth
  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0] || 'Valued Patron',
      email,
      addresses: [shippingAddress]
    };
    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const signup = (name: string, email: string) => {
    login(email, name);
    addToast(`Account created for ${name}`, 'success');
  };

  const loginWithEmail = (email: string, _password?: string) => {
    login(email);
  };

  const loginWithGoogle = () => {
    login('patron.ayurveda@gmail.com', 'Dr. Ramesh Deshmukh');
  };

  const logout = () => {
    setUser(null);
    addToast('Signed out of Riyansh Amrit', 'info');
  };

  // Create Order
  const createOrder = (
    optsOrAddress?: { paymentMethod?: string; paymentStatus?: string } | ShippingAddress,
    legacyPaymentMethod?: any
  ): Order => {
    let targetAddress = shippingAddress;
    let method = 'UPI';
    let pStatus = 'Paid';

    if (optsOrAddress && 'addressLine1' in optsOrAddress) {
      targetAddress = optsOrAddress as ShippingAddress;
      if (legacyPaymentMethod) method = legacyPaymentMethod;
    } else if (optsOrAddress && 'paymentMethod' in optsOrAddress) {
      const opts = optsOrAddress as { paymentMethod?: string; paymentStatus?: string };
      if (opts.paymentMethod) method = opts.paymentMethod;
      if (opts.paymentStatus) pStatus = opts.paymentStatus;
    }

    const orderId = `RY-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const newOrder: Order = {
      id: orderId,
      date: now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      createdAt: now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image,
        volume: item.selectedVolume || item.product.volume,
        product: item.product,
        selectedVolume: item.selectedVolume || item.product.volume
      })),
      shippingAddress: targetAddress,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      total: cartTotal,
      currency,
      paymentMethod: method,
      paymentStatus: pStatus,
      status: 'confirmed',
      fulfillmentStatus: 'Processing',
      trackingNumber: `RY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US',
        { month: 'short', day: 'numeric', year: 'numeric' }
      )
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CommerceContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orderNote,
        setOrderNote,
        couponCode,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold,
        isFreeShipping,
        shippingFee,
        cartTotal,

        wishlist,
        wishlistCount,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,

        currency,
        setCurrency,
        formatPrice,

        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,

        shippingAddress,
        setShippingAddress,

        user,
        login,
        signup,
        logout,
        loginWithEmail,
        loginWithGoogle,

        orders,
        createOrder,
        lastOrder,

        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
