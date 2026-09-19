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
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
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
  paymentStatus: string;
  status?: string;
  fulfillmentStatus: 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered' | string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  savedAddresses?: ShippingAddress[];
  addresses?: any[];
}
