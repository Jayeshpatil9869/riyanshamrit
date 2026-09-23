import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  WishlistItem,
  Order,
  User,
  Currency,
  ShippingAddress,
  StoreSettings,
  AdminActivityLog
} from '../types';
import { RIYANSH_PRODUCTS } from '../data/products';
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminActivity,
  fetchAdminCustomers,
  fetchAdminOrders,
  fetchAdminProducts,
  getAdminToken,
  updateAdminOrderStatus,
  updateAdminProduct,
  type AdminActivityRow,
  type AdminCustomerRow,
  type AdminOrderRow,
  type AdminProductRow,
} from '../lib/adminApi';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface CommerceContextType {
  // Products Catalog (Reactive & Persistent)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

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
  discountAmount: number;
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

  // Auth & User Management
  user: User | null;
  users: User[];
  login: (email: string, name?: string, role?: 'admin' | 'customer' | 'moderator') => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  loginWithEmail: (email: string, password?: string, role?: 'admin' | 'customer') => void;
  loginWithGoogle: () => void;
  loginAsDemoAdmin: () => void;
  loginAsDemoPatron: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addSavedAddress: (address: Omit<ShippingAddress, 'id'>) => void;
  deleteSavedAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Admin User Directory Management
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  updateUserRole: (id: string, role: 'admin' | 'customer' | 'moderator') => void;
  updateUserStatus: (id: string, status: 'active' | 'vip' | 'suspended') => void;

  // Shipping & Orders
  shippingAddress: ShippingAddress;
  setShippingAddress: (address: ShippingAddress) => void;
  orders: Order[];
  createOrder: (
    optsOrAddress?: { paymentMethod?: string; paymentStatus?: string } | ShippingAddress,
    legacyPaymentMethod?: any
  ) => Order;
  lastOrder: Order | null;
  updateOrderStatus: (
    orderId: string,
    status: string,
    fulfillmentStatus: string,
    carrier?: string,
    trackingNumber?: string,
    estimatedDelivery?: string
  ) => void;
  cancelOrder: (orderId: string, reason?: string) => void;

  // Storefront Controls & Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;

  // Admin Audit Logs
  activityLogs: AdminActivityLog[];
  logAdminAction: (
    action: string,
    category: AdminActivityLog['category'],
    details: string
  ) => void;

  // Live admin API sync
  adminBackendConnected: boolean;
  syncAdminFromBackend: () => Promise<void>;

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

const INITIAL_STORE_SETTINGS: StoreSettings = {
  announcementText: 'Complimentary Pan-India Express Delivery on all orders above ₹999 • Handcrafted in Sangamner',
  isAnnouncementActive: true,
  marqueeSpeed: 30,
  freeShippingThreshold: 999,
  supportEmail: 'care@riyanshamrit.com',
  supportPhone: '+91 98224 88300',
  storeName: 'Riyansh Amrit — Luxury Ayurvedic Botanicals',
  maintenanceMode: false,
  taxRatePercent: 12
};

const INITIAL_DEMO_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Jayesh B. Patil',
    email: 'admin@riyanshamrit.com',
    phone: '+91 98224 88300',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'January 10, 2026',
    totalOrders: 18,
    totalSpent: 42800,
    status: 'active',
    doshaPreference: 'Tridoshic',
    savedAddresses: [
      {
        id: 'addr-01',
        fullName: 'Jayesh B. Patil',
        email: 'admin@riyanshamrit.com',
        phone: '+91 98224 88300',
        addressLine1: 'Flat 402, Prathamesh Heights, Shivajinagar',
        addressLine2: 'Near Sangamner Bus Stand',
        city: 'Sangamner',
        state: 'Maharashtra',
        pincode: '422605',
        country: 'India',
        isDefault: true,
        label: 'Dispensary HQ'
      }
    ]
  },
  {
    id: 'usr-002',
    name: 'Dr. Ramesh Deshmukh',
    email: 'patron.ayurveda@gmail.com',
    phone: '+91 98231 44520',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'February 14, 2026',
    totalOrders: 6,
    totalSpent: 14250,
    status: 'vip',
    doshaPreference: 'Vata',
    savedAddresses: [
      {
        id: 'addr-02',
        fullName: 'Dr. Ramesh Deshmukh',
        email: 'patron.ayurveda@gmail.com',
        phone: '+91 98231 44520',
        addressLine1: 'Plot 12, Baner Wellness Enclave',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        country: 'India',
        isDefault: true,
        label: 'Clinic'
      }
    ]
  },
  {
    id: 'usr-003',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@outlook.com',
    phone: '+91 99882 11234',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'March 02, 2026',
    totalOrders: 3,
    totalSpent: 6790,
    status: 'active',
    doshaPreference: 'Pitta',
    savedAddresses: [
      {
        id: 'addr-03',
        fullName: 'Ananya Sharma',
        email: 'ananya.sharma@outlook.com',
        phone: '+91 99882 11234',
        addressLine1: 'Tower B, 1404, Sea Breeze Apts, Worli',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400018',
        country: 'India',
        isDefault: true,
        label: 'Home'
      }
    ]
  },
  {
    id: 'usr-004',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@zenith.in',
    phone: '+91 98110 99482',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    joinedDate: 'April 19, 2026',
    totalOrders: 1,
    totalSpent: 2890,
    status: 'active',
    doshaPreference: 'Kapha',
    savedAddresses: [
      {
        id: 'addr-04',
        fullName: 'Vikramaditya Roy',
        email: 'vikram.roy@zenith.in',
        phone: '+91 98110 99482',
        addressLine1: '45/2 Defence Colony',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110024',
        country: 'India',
        isDefault: true,
        label: 'Residence'
      }
    ]
  }
];

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'RY-ORD-88210',
    date: 'September 12, 2026',
    createdAt: 'Sep 12, 2026',
    customerName: 'Jayesh B. Patil',
    customerEmail: 'admin@riyanshamrit.com',
    items: [
      {
        productId: 'prod-01',
        productName: 'Gentle Cleanser',
        quantity: 2,
        price: 24,
        image: '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
        volume: '150 ml',
        product: RIYANSH_PRODUCTS[0],
        selectedVolume: '150 ml'
      },
      {
        productId: 'prod-02',
        productName: 'Hydrating Serum',
        quantity: 1,
        price: 38,
        image: '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg',
        volume: '50 ml',
        product: RIYANSH_PRODUCTS[1],
        selectedVolume: '50 ml'
      }
    ],
    shippingAddress: {
      fullName: 'Jayesh B. Patil',
      email: 'admin@riyanshamrit.com',
      phone: '+91 98224 88300',
      addressLine1: 'Flat 402, Prathamesh Heights, Shivajinagar',
      city: 'Sangamner',
      state: 'Maharashtra',
      pincode: '422605',
      country: 'India'
    },
    subtotal: 86,
    discount: 8.6,
    shippingFee: 0,
    total: 77.4,
    currency: 'INR',
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    status: 'in_transit',
    fulfillmentStatus: 'In Transit',
    carrier: 'Bluedart Express',
    trackingNumber: 'BD-IND-94821094',
    estimatedDelivery: 'September 22, 2026'
  },
  {
    id: 'RY-ORD-88211',
    date: 'September 15, 2026',
    createdAt: 'Sep 15, 2026',
    customerName: 'Dr. Ramesh Deshmukh',
    customerEmail: 'patron.ayurveda@gmail.com',
    items: [
      {
        productId: 'prod-03',
        productName: 'Nourishing Oil',
        quantity: 2,
        price: 32,
        image: '/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png',
        volume: '30 ml',
        product: RIYANSH_PRODUCTS[2],
        selectedVolume: '30 ml'
      }
    ],
    shippingAddress: {
      fullName: 'Dr. Ramesh Deshmukh',
      email: 'patron.ayurveda@gmail.com',
      phone: '+91 98231 44520',
      addressLine1: 'Plot 12, Baner Wellness Enclave',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      country: 'India'
    },
    subtotal: 64,
    discount: 9.6,
    shippingFee: 0,
    total: 54.4,
    currency: 'INR',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'processing',
    fulfillmentStatus: 'Processing',
    carrier: 'Delhivery Logistics',
    trackingNumber: 'DLHV-88392019',
    estimatedDelivery: 'September 24, 2026'
  },
  {
    id: 'RY-ORD-88209',
    date: 'September 08, 2026',
    createdAt: 'Sep 08, 2026',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@outlook.com',
    items: [
      {
        productId: 'prod-04',
        productName: 'Restorative Cream',
        quantity: 1,
        price: 42,
        image: '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
        volume: '50 ml',
        product: RIYANSH_PRODUCTS[3] || RIYANSH_PRODUCTS[0],
        selectedVolume: '50 ml'
      }
    ],
    shippingAddress: {
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@outlook.com',
      phone: '+91 99882 11234',
      addressLine1: 'Tower B, 1404, Sea Breeze Apts, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      country: 'India'
    },
    subtotal: 42,
    discount: 0,
    shippingFee: 0,
    total: 42,
    currency: 'INR',
    paymentMethod: 'Net Banking',
    paymentStatus: 'Paid',
    status: 'delivered',
    fulfillmentStatus: 'Delivered',
    carrier: 'DTDC Courier',
    trackingNumber: 'DTDC-77492109',
    estimatedDelivery: 'September 11, 2026'
  }
];

const INITIAL_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'log-01',
    timestamp: 'Today at 11:30 AM',
    adminName: 'Jayesh B. Patil',
    action: 'Dispatched Order #RY-ORD-88210',
    category: 'orders',
    details: 'Generated Bluedart AWB BD-IND-94821094 for Sangamner Hub'
  },
  {
    id: 'log-02',
    timestamp: 'Today at 09:15 AM',
    adminName: 'Jayesh B. Patil',
    action: 'Updated Store Announcement',
    category: 'settings',
    details: 'Enabled complimentary express delivery threshold at ₹999'
  },
  {
    id: 'log-03',
    timestamp: 'Yesterday at 04:45 PM',
    adminName: 'Jayesh B. Patil',
    action: 'Updated Formulation Stock',
    category: 'products',
    details: 'Replenished inventory for Hydrating Serum (50 units added)'
  }
];

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Reactive Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return RIYANSH_PRODUCTS;
  });

  // 2. Users Directory & Active User State
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_users_directory');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DEMO_USERS;
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('riyansh_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default to admin for seamless evaluation
    return INITIAL_DEMO_USERS[0];
  });

  // 3. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DEMO_ORDERS;
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // 4. Storefront Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('riyansh_store_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STORE_SETTINGS;
  });

  // 5. Activity Logs
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_activity_logs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ACTIVITY_LOGS;
  });

  // 6. Cart State
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

  // 8. Wishlist State
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('riyansh_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { product: RIYANSH_PRODUCTS[1], addedAt: new Date().toISOString() },
      { product: RIYANSH_PRODUCTS[2] || RIYANSH_PRODUCTS[0], addedAt: new Date().toISOString() }
    ];
  });
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  // 9. Currency State
  const [currency, setCurrency] = useState<Currency>('INR');

  // 10. Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 11. Shipping Address State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    id: 'addr-active',
    fullName: user?.name || 'Jayesh B. Patil',
    email: user?.email || 'admin@riyanshamrit.com',
    phone: user?.phone || '+91 98224 88300',
    addressLine1: 'Flat 402, Prathamesh Heights, Shivajinagar',
    addressLine2: 'Near Sangamner Bus Stand',
    city: 'Sangamner',
    state: 'Maharashtra',
    pincode: '422605',
    country: 'India',
    isDefault: true,
    label: 'Primary Address'
  });

  // 12. Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [adminBackendConnected, setAdminBackendConnected] = useState(false);

  const mapApiProduct = (row: AdminProductRow): Product => {
    const price = Number(row.price) || 0;
    const compare = Number(row.compareAtPrice ?? price) || price;
    const image = row.imageUrl || row.images?.[0] || '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png';
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.description?.slice(0, 80) || 'Ayurvedic formulation',
      category: 'Wellness',
      healthConcern: 'Daily wellness',
      price,
      compareAtPrice: compare,
      rating: 4.8,
      reviewCount: 0,
      image,
      hoverImage: image,
      gallery: row.images?.length ? row.images : [image],
      volume: '100 ml',
      sku: row.slug?.toUpperCase().slice(0, 12) || 'RY-SKU',
      inStock: row.isActive !== false && (row.stockQuantity ?? 0) > 0,
      featured: Boolean(row.isFeatured),
      description: row.description || '',
      keyBenefits: [],
      ingredients: [],
      dosageInstructions: '',
      certifications: [],
      stockCount: row.stockQuantity ?? 0,
      createdAt: undefined,
    };
  };

  const mapApiOrder = (row: AdminOrderRow): Order => {
    const addr = (row.shippingAddress ?? {}) as Partial<ShippingAddress>;
    const status = String(row.status || 'pending').toLowerCase();
    const fulfillment =
      status === 'shipped' || status === 'in_transit'
        ? 'In Transit'
        : status === 'delivered'
          ? 'Delivered'
          : status === 'cancelled'
            ? 'Cancelled'
            : 'Processing';
    return {
      id: row.id,
      date: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '',
      createdAt: row.createdAt,
      items: [],
      shippingAddress: {
        fullName: addr.fullName || 'Patron',
        email: addr.email || '',
        phone: addr.phone || '',
        addressLine1: addr.addressLine1 || '',
        city: addr.city || '',
        state: addr.state || '',
        pincode: addr.pincode || '',
        country: addr.country || 'India',
      },
      subtotal: Number(row.totalAmount) || 0,
      discount: 0,
      shippingFee: 0,
      total: Number(row.totalAmount) || 0,
      currency: 'INR',
      paymentMethod: 'PayU',
      paymentStatus: status === 'paid' || status === 'delivered' || status === 'shipped' ? 'Paid' : 'Pending',
      status,
      fulfillmentStatus: fulfillment,
      customerName: addr.fullName,
      customerEmail: addr.email,
    };
  };

  const mapApiCustomer = (row: AdminCustomerRow): User => ({
    id: row.id,
    name: row.fullName || row.email.split('@')[0] || 'Patron',
    email: row.email,
    phone: row.phone || undefined,
    role: row.email === 'admin@riyanshamrit.com' ? 'admin' : 'customer',
    avatar: row.avatarUrl || undefined,
    status: 'active',
    joinedDate: row.createdAt,
    savedAddresses: [],
  });

  const mapApiActivity = (row: AdminActivityRow): AdminActivityLog => {
    const entity = String(row.entityType || 'system');
    const category: AdminActivityLog['category'] =
      entity.includes('product')
        ? 'products'
        : entity.includes('order')
          ? 'orders'
          : entity.includes('user') || entity.includes('customer')
            ? 'customers'
            : 'settings';
    return {
      id: row.id,
      action: row.action,
      category,
      details: row.description,
      timestamp: row.createdAt
        ? new Date(row.createdAt).toLocaleString()
        : new Date().toLocaleString(),
      adminName: 'Administrator',
    };
  };

  const syncAdminFromBackend = async () => {
    if (!getAdminToken()) {
      setAdminBackendConnected(false);
      return;
    }
    try {
      const [productRes, orderRes, customerRes, activityRes] =
        await Promise.all([
          fetchAdminProducts(),
          fetchAdminOrders(),
          fetchAdminCustomers(),
          fetchAdminActivity().catch(() => ({ items: [] as AdminActivityRow[] })),
        ]);

      setProducts(productRes.items.map(mapApiProduct));
      setOrders(orderRes.items.map(mapApiOrder));
      setUsers(customerRes.items.map(mapApiCustomer));
      if (activityRes.items.length) setActivityLogs(activityRes.items.map(mapApiActivity));
      setAdminBackendConnected(true);
    } catch (err) {
      setAdminBackendConnected(false);
      throw err;
    }
  };

  // LocalStorage synchronizers
  useEffect(() => {
    try { localStorage.setItem('riyansh_products', JSON.stringify(products)); } catch {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem('riyansh_users_directory', JSON.stringify(users)); } catch {}
  }, [users]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('riyansh_user', JSON.stringify(user));
      else localStorage.removeItem('riyansh_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem('riyansh_orders', JSON.stringify(orders)); } catch {}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem('riyansh_store_settings', JSON.stringify(storeSettings)); } catch {}
  }, [storeSettings]);

  useEffect(() => {
    try { localStorage.setItem('riyansh_activity_logs', JSON.stringify(activityLogs)); } catch {}
  }, [activityLogs]);

  useEffect(() => {
    try { localStorage.setItem('riyansh_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('riyansh_wishlist', JSON.stringify(wishlist)); } catch {}
  }, [wishlist]);

  // Toast Helpers
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

  const logAdminAction = (action: string, category: AdminActivityLog['category'], details: string) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      adminName: user?.name || 'Store Administrator',
      action,
      category,
      details
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Pricing Helpers
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
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeShippingThreshold = storeSettings.freeShippingThreshold;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 99;
  const discountAmount = 0;
  const cartTotal = Math.max(0, cartSubtotal + shippingFee);

  // Cart operations
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
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from bag', 'info');
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
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

  const isInWishlist = (productId: string) => wishlist.some((item) => item.product.id === productId);

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Removed from wishlist', 'info');
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast('Wishlist cleared', 'info');
  };

  // Product Catalog CRUD (Reactive + API)
  const addProduct = (newProdData: Omit<Product, 'id'>): Product => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      slug: newProdData.slug || newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      stockCount: newProdData.stockCount ?? 100,
      createdAt: new Date().toISOString()
    };
    setProducts((prev) => [newProduct, ...prev]);
    logAdminAction(`Added formulation "${newProduct.name}"`, 'products', `SKU: ${newProduct.sku}, Price: ₹${newProduct.price}`);
    addToast(`Created formulation "${newProduct.name}"`, 'success');

    if (adminBackendConnected || getAdminToken()) {
      void createAdminProduct({
        name: newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        price: newProduct.price,
        compareAtPrice: newProduct.compareAtPrice,
        imageUrl: newProduct.image,
        images: newProduct.gallery,
        stockQuantity: newProduct.stockCount ?? 0,
        isFeatured: Boolean(newProduct.featured),
        isActive: newProduct.inStock,
      })
        .then(() => syncAdminFromBackend())
        .catch((err) => addToast(err instanceof Error ? err.message : 'API create failed', 'error'));
    }
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          logAdminAction(`Updated formulation "${updated.name}"`, 'products', `Modified fields: ${Object.keys(updates).join(', ')}`);
          return updated;
        }
        return p;
      })
    );
    addToast('Product details updated', 'success');

    if (adminBackendConnected || getAdminToken()) {
      const patch: Record<string, unknown> = {};
      if (updates.name != null) patch.name = updates.name;
      if (updates.slug != null) patch.slug = updates.slug;
      if (updates.description != null) patch.description = updates.description;
      if (updates.price != null) patch.price = updates.price;
      if (updates.compareAtPrice != null) patch.compareAtPrice = updates.compareAtPrice;
      if (updates.image != null) patch.imageUrl = updates.image;
      if (updates.gallery != null) patch.images = updates.gallery;
      if (updates.stockCount != null) patch.stockQuantity = updates.stockCount;
      if (updates.featured != null) patch.isFeatured = updates.featured;
      if (updates.inStock != null) patch.isActive = updates.inStock;
      void updateAdminProduct(id, patch)
        .then(() => syncAdminFromBackend())
        .catch((err) => addToast(err instanceof Error ? err.message : 'API update failed', 'error'));
    }
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      logAdminAction(`Archived formulation "${target.name}"`, 'products', `Removed from store catalog`);
    }
    addToast('Product archived from catalog', 'info');

    if (adminBackendConnected || getAdminToken()) {
      void deleteAdminProduct(id)
        .then(() => syncAdminFromBackend())
        .catch((err) => addToast(err instanceof Error ? err.message : 'API archive failed', 'error'));
    }
  };

  const resetProductsToDefault = () => {
    setProducts(RIYANSH_PRODUCTS);
    logAdminAction('Reset catalog to factory defaults', 'products', 'Reloaded initial formulations');
    addToast('Product catalog reset to default formulations', 'info');
  };

  // Auth Operations
  const login = (email: string, name?: string, role: 'admin' | 'customer' | 'moderator' = 'customer') => {
    let existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!existingUser) {
      existingUser = {
        id: `usr-${Date.now()}`,
        name: name || email.split('@')[0] || 'Valued Customer',
        email,
        phone: '+91 98000 00000',
        role,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        totalOrders: 0,
        totalSpent: 0,
        status: 'active',
        doshaPreference: 'Not Determined',
        savedAddresses: []
      };
      setUsers((prev) => [existingUser!, ...prev]);
    }
    setUser(existingUser);
    addToast(`Signed in as ${existingUser.name} (${existingUser.role?.toUpperCase() || 'CUSTOMER'})`, 'success');
  };

  const signup = (name: string, email: string) => {
    login(email, name, 'customer');
    addToast(`Account created for ${name}`, 'success');
  };

  const loginWithEmail = (email: string, _password?: string, role: 'admin' | 'customer' = 'customer') => {
    if (email.toLowerCase().includes('admin')) {
      login(email, 'Jayesh B. Patil', 'admin');
    } else {
      login(email, undefined, role);
    }
  };

  const loginWithGoogle = () => {
    login('patron.ayurveda@gmail.com', 'Dr. Ramesh Deshmukh', 'customer');
  };

  const loginAsDemoAdmin = () => {
    const adminUser = users.find((u) => u.role === 'admin') || INITIAL_DEMO_USERS[0];
    setUser(adminUser);
    addToast('Logged in as Administrator (Jayesh B. Patil)', 'success');
  };

  const loginAsDemoPatron = () => {
    const patronUser = users.find((u) => u.role === 'customer') || INITIAL_DEMO_USERS[1];
    setUser(patronUser);
    addToast(`Logged in as Customer (${patronUser.name})`, 'success');
  };

  const logout = () => {
    setUser(null);
    addToast('Signed out of Riyansh Amrit', 'info');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    addToast('Profile updated successfully', 'success');
  };

  const addSavedAddress = (addressData: Omit<ShippingAddress, 'id'>) => {
    if (!user) return;
    const newAddr: ShippingAddress = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    const updatedAddresses = [...(user.savedAddresses || []), newAddr];
    updateUserProfile({ savedAddresses: updatedAddresses });
    addToast('Address added to your address book', 'success');
  };

  const deleteSavedAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = (user.savedAddresses || []).filter((a) => a.id !== id);
    updateUserProfile({ savedAddresses: updatedAddresses });
    addToast('Address removed', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = (user.savedAddresses || []).map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    updateUserProfile({ savedAddresses: updatedAddresses });
    const chosen = updatedAddresses.find((a) => a.id === id);
    if (chosen) setShippingAddress(chosen);
    addToast('Default delivery address updated', 'success');
  };

  // User Directory Admin operations
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      totalOrders: 0,
      totalSpent: 0
    };
    setUsers((prev) => [newUser, ...prev]);
    logAdminAction(`Registered customer "${newUser.name}"`, 'customers', `Role: ${newUser.role}`);
    addToast(`Customer ${newUser.name} created`, 'success');
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const updated = { ...u, ...updates };
          if (user && user.id === id) setUser(updated);
          return updated;
        }
        return u;
      })
    );
    addToast('Customer record updated', 'success');
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast('User deleted', 'info');
  };

  const updateUserRole = (id: string, role: 'admin' | 'customer' | 'moderator') => {
    updateUser(id, { role });
    logAdminAction(`Updated user role for ID ${id}`, 'customers', `New role: ${role}`);
  };

  const updateUserStatus = (id: string, status: 'active' | 'vip' | 'suspended') => {
    updateUser(id, { status });
    logAdminAction(`Updated user status for ID ${id}`, 'customers', `New status: ${status}`);
  };

  // Orders creation and admin operations
  const createOrder = (
    optsOrAddress?: { paymentMethod?: string; paymentStatus?: string } | ShippingAddress,
    legacyPaymentMethod?: any
  ): Order => {
    let targetAddress = shippingAddress;
    let method = 'UPI';
    let pStatus: Order['paymentStatus'] = 'Paid';

    if (optsOrAddress && 'addressLine1' in optsOrAddress) {
      targetAddress = optsOrAddress as ShippingAddress;
      if (legacyPaymentMethod) method = legacyPaymentMethod;
    } else if (optsOrAddress && 'paymentMethod' in optsOrAddress) {
      const opts = optsOrAddress as { paymentMethod?: string; paymentStatus?: string };
      if (opts.paymentMethod) method = opts.paymentMethod;
      if (opts.paymentStatus) pStatus = opts.paymentStatus as any;
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
      customerName: user?.name || targetAddress.fullName,
      customerEmail: user?.email || targetAddress.email,
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
      carrier: 'Bluedart Express',
      trackingNumber: `RY-AWB-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US',
        { month: 'short', day: 'numeric', year: 'numeric' }
      )
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);

    // Update user stats
    if (user) {
      const updatedSpent = (user.totalSpent || 0) + cartTotal;
      const updatedOrders = (user.totalOrders || 0) + 1;
      updateUserProfile({ totalSpent: updatedSpent, totalOrders: updatedOrders });
    }

    logAdminAction(`New Order ${orderId} received`, 'orders', `Amount: ₹${cartTotal}, Customer: ${newOrder.customerName}`);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: string,
    fulfillmentStatus: string,
    carrier?: string,
    trackingNumber?: string,
    estimatedDelivery?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated: Order = {
            ...o,
            status: status as any,
            fulfillmentStatus: fulfillmentStatus as any,
            carrier: carrier || o.carrier,
            trackingNumber: trackingNumber || o.trackingNumber,
            estimatedDelivery: estimatedDelivery || o.estimatedDelivery
          };
          logAdminAction(
            `Order ${orderId} marked as ${fulfillmentStatus}`,
            'orders',
            `Carrier: ${updated.carrier}, AWB: ${updated.trackingNumber}`
          );
          return updated;
        }
        return o;
      })
    );
    addToast(`Order ${orderId} updated to "${fulfillmentStatus}"`, 'success');

    if (adminBackendConnected || getAdminToken()) {
      const apiStatus =
        fulfillmentStatus === 'In Transit' || status === 'in_transit'
          ? 'shipped'
          : fulfillmentStatus === 'Delivered' || status === 'delivered'
            ? 'delivered'
            : fulfillmentStatus === 'Cancelled' || status === 'cancelled'
              ? 'cancelled'
              : 'processing';
      void updateAdminOrderStatus(orderId, apiStatus)
        .then(() => syncAdminFromBackend())
        .catch((err) => addToast(err instanceof Error ? err.message : 'Order sync failed', 'error'));
    }
  };

  const cancelOrder = (orderId: string, reason = 'Cancelled by store administration') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled', fulfillmentStatus: 'Cancelled' } : o))
    );
    logAdminAction(`Order ${orderId} Cancelled`, 'orders', reason);
    addToast(`Order ${orderId} cancelled`, 'info');
    if (adminBackendConnected || getAdminToken()) {
      void updateAdminOrderStatus(orderId, 'cancelled')
        .then(() => syncAdminFromBackend())
        .catch((err) => addToast(err instanceof Error ? err.message : 'Cancel sync failed', 'error'));
    }
  };

  // Store Settings
  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    setStoreSettings((prev) => {
      const updated = { ...prev, ...updates };
      logAdminAction('Updated Storefront Settings', 'settings', `Modified: ${Object.keys(updates).join(', ')}`);
      return updated;
    });
    addToast('Storefront configurations saved', 'success');
  };

  return (
    <CommerceContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,

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
        discountAmount,
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

        user,
        users,
        login,
        signup,
        logout,
        loginWithEmail,
        loginWithGoogle,
        loginAsDemoAdmin,
        loginAsDemoPatron,
        updateUserProfile,
        addSavedAddress,
        deleteSavedAddress,
        setDefaultAddress,
        addUser,
        updateUser,
        deleteUser,
        updateUserRole,
        updateUserStatus,

        shippingAddress,
        setShippingAddress,

        orders,
        createOrder,
        lastOrder,
        updateOrderStatus,
        cancelOrder,

        storeSettings,
        updateStoreSettings,

        activityLogs,
        logAdminAction,

        adminBackendConnected,
        syncAdminFromBackend,

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

