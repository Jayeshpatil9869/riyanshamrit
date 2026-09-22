# API Architecture

Base path: `/api/v1`  
App: Fastify modular monolith on Vercel (`apps/api`)

## Flow

```
HTTP → route → Zod validation → auth (optional/required) → RBAC → controller → service → repository → Postgres
```

Business logic lives in services, not route handlers.

## Public / customer

| Method | Path | Auth | Tables |
|--------|------|------|--------|
| GET | `/health` | no | — |
| GET | `/products` | no | products, categories |
| GET | `/products/:slug` | no | products, categories |
| GET | `/categories` | no | categories |
| GET | `/categories/:slug` | no | categories, products |
| POST | `/auth/session` | cookie/JWT | users |
| GET/PUT | `/me` | yes | users |
| GET/POST/PATCH/DELETE | `/cart/items` | yes | cart_items, products |
| GET/POST/DELETE | `/wishlist/items` | yes | wishlist_items |
| POST | `/checkout` | yes | orders, order_items, products, transactions |
| GET | `/orders` | yes | orders, order_items |
| GET | `/orders/:id` | yes + ownership | orders, order_items |
| POST | `/payments/payu/initiate` | yes | orders, transactions |
| POST | `/payments/payu/webhook` | signature | orders, transactions, webhook_events |

## Admin (`/api/v1/admin/*`)

Requires JWT + permission (e.g. `products.update`).

| Resource | Operations |
|----------|------------|
| `/dashboard` | Aggregated metrics (cached) |
| `/products` | CRUD + stock |
| `/categories` | CRUD |
| `/orders` | list/detail/status update |
| `/customers` | list/detail |
| `/transactions` | list/detail |
| `/activity` | list |
| `/coupons` | CRUD (after table) |
| `/reviews` | moderate (after table) |
| `/seo` | metadata/redirects (after table) |
| `/settings` | site_settings |

## Conventions

- Cursor pagination for products/orders/customers (bounded `limit`, max 50)
- Error shape: `{ success: false, error: { code, message, requestId } }`
- No stack traces / SQL in production responses
- Idempotency-Key header for checkout and payment initiate
- requestId on every response via Pino + header

## Versioning

`/api/v1` only. Breaking changes require `/api/v2`.
