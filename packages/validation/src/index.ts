import { z } from "zod";

export const cursorQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const productCreateSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().positive().optional(),
  categoryId: z.string().uuid().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  images: z.array(z.string()).optional(),
  stockQuantity: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const categoryCreateSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
});

export const cartUpsertSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(99),
});

export const checkoutSchema = z.object({
  shippingAddress: z.record(z.unknown()),
  billingAddress: z.record(z.unknown()).optional(),
  notes: z.string().max(1000).optional(),
  couponCode: z.string().optional(),
});

export const couponCreateSchema = z.object({
  code: z.string().min(2).max(40),
  description: z.string().optional(),
  discountType: z.enum(["percent", "percentage", "fixed"]),
  discountValue: z.coerce.number().positive(),
  minOrderAmount: z.coerce.number().nonnegative().optional(),
  maxRedemptions: z.coerce.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export const reviewCreateSchema = z.object({
  productId: z.string().uuid(),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  body: z.string().max(2000).optional(),
});

export const orderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ]),
});
