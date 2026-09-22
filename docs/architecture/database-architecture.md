# Database Architecture

**Project:** `auth.riyanshamrit.com` (`iwvrjjgjxxtlvvbdbytb`)  
**Region:** us-east-2 · Postgres 17  
**Rule:** Continue this database. Additive migrations only. Never drop live ecommerce tables.

## Live public schema (source of truth)

| Table | Purpose |
|-------|---------|
| `users` | Profile mirror of `auth.users` (id FK CASCADE) |
| `categories` | Catalog categories (unique slug) |
| `products` | Catalog + `stock_quantity` on row (unique slug) |
| `cart_items` | Per-user cart; UNIQUE(user_id, product_id) |
| `wishlist_items` | UNIQUE(user_id, product_id) |
| `orders` | Orders + PayU columns + address jsonb |
| `order_items` | Line items with name/image/price snapshots |
| `transactions` | Payment ledger + PayU raw_response |
| `activity_logs` | Audit trail |

## Relationships

```
auth.users 1—1 public.users
users 1—* cart_items, wishlist_items, orders, transactions, activity_logs
categories 1—* products
products 1—* cart_items, wishlist_items, order_items
orders 1—* order_items, transactions
```

## Indexes (existing)

- Unique: `users.email`, `categories.slug`, `products.slug`, cart/wishlist `(user_id, product_id)`
- Lookup: `products.category_id`, `orders.user_id`, `orders.payu_txnid`, `order_items.order_id`, transactions user/order/status/created_at, activity_logs user/action/entity/created_at

## Additive roadmap (gaps)

| Priority | Addition |
|----------|----------|
| P0 | `roles`, `permissions`, `user_roles`, `role_permissions` |
| P0 | `idempotency_keys`, `webhook_events` |
| P1 | `addresses` |
| P1 | index `orders(status)`, `orders(created_at DESC)` |
| P1 | `inventory_movements` (stock SoT remains `products.stock_quantity`) |
| P2 | `coupons`, `coupon_redemptions` |
| P2 | `reviews`, `review_votes` |
| P2 | `seo_metadata`, `redirects`, `content_entries`, `site_settings`, `homepage_sections` |

## Access model

- Browser: Supabase anon key + user JWT; RLS for own rows
- API (`apps/api`): service role + explicit BOLA/RBAC checks in application code
- Never expose service role to clients

## Out of scope (v1)

- Product variants / SKU table
- Parent `carts` table
- Parallel `payments` table replacing `transactions`
- Catalog reseed from frontend `products.ts`
