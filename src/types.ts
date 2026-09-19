export type Currency = 'INR' | 'USD' | 'EUR';

export interface Ingredient {
  name: string;
  botanicalName?: string;
  role: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location?: string;
  title?: string;
  avatar?: string;
  productName?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  healthConcern: string;
  price: number;
  compareAtPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  tag?: string;
  volume: string;
  sku: string;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  description: string;
  keyBenefits: string[];
  ingredients: Ingredient[];
  dosageInstructions: string;
  certifications: string[];
  cautions?: string;
  stockCount?: number;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
  volume: string;
  product?: Product;
  selectedVolume?: string;
}

export interface ShippingAddress {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
  label?: string; // 'Home' | 'Office' | 'Clinic'
}

export interface Order {
  id: string;
  date: string;
  createdAt?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  currency: Currency;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded' | string;
  status?: 'confirmed' | 'processing' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled' | string;
  fulfillmentStatus: 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  orderNotes?: string;
  customerEmail?: string;
  customerName?: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'admin' | 'customer' | 'moderator';
  avatar?: string;
  joinedDate?: string;
  totalOrders?: number;
  totalSpent?: number;
  status?: 'active' | 'vip' | 'suspended';
  doshaPreference?: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic' | 'Not Determined';
  savedAddresses?: ShippingAddress[];
  addresses?: any[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10 for 10%) or fixed INR (e.g. 150)
  minSpend: number;
  usageCount: number;
  maxUses?: number;
  expiryDate?: string;
  isActive: boolean;
  description: string;
}

export interface StoreSettings {
  announcementText: string;
  isAnnouncementActive: boolean;
  marqueeSpeed: number; // in seconds
  freeShippingThreshold: number;
  supportEmail: string;
  supportPhone: string;
  storeName: string;
  maintenanceMode: boolean;
  taxRatePercent: number;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  category: 'products' | 'orders' | 'customers' | 'coupons' | 'settings' | 'auth';
  details: string;
}

