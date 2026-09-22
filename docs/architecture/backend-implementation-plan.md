# Backend Implementation Plan

Riyanshamrit production ecommerce: modular monorepo, Next.js + Fastify on Vercel, **existing** Supabase `iwvrjjgjxxtlvvbdbytb`, PayU, Upstash, Inngest, admin-driven ops.

Companion docs: [database](./database-architecture.md) · [api](./api-architecture.md) · [security](./security-architecture.md) · [redis](./redis-architecture.md) · [seo](./seo-architecture.md)

## 1. Current architecture

- Vite 8 + React 19 SPA; custom History router; Tailwind 4
- Commerce authority in `CommerceContext` + localStorage
- Hardcoded `src/data/products.ts`; mock Google auth; simulated PayU UI
- Express `server.js` static + unused mocks; no tests/CI

## 2. Target architecture

```
apps/web (Next.js) + apps/admin (Next.js) + apps/api (Fastify)
→ packages/{database,auth,cache,payments,validation,types,seo,logger,config}
→ Supabase Postgres/Auth + Upstash + PayU + Inngest
```

## 3–4. Migration & monorepo

pnpm workspaces + Turborepo. Move UI into `apps/web` without visual redesign. Progressive CommerceContext shrinkage (Phases A–L in master brief). Additive DB only.

## 5–6. Backend & database

Fastify module layout: routes → controller → service → repository.  
DB: continue 9 live tables; see database-architecture.md.

## 7. Redis

Upstash; see redis-architecture.md. Not SoT.

## 8–10. Auth, Google OAuth, RBAC

Reuse live Supabase Auth (email + Google). Add `roles`/`permissions` joins. JWT verify on API. Admin MFA before prod.

## 11. Admin

`apps/admin` + `/api/v1/admin/*` for products, categories, orders, customers, transactions, activity, settings, later coupons/SEO.

## 12–16. Catalog, cart, wishlist, inventory, checkout

Read/write live `products`/`categories`/`cart_items`/`wishlist_items`. Stock on `products.stock_quantity` with transactional decrement; later `inventory_movements`.

## 17–18. Payment & webhooks

PayU via existing `orders.payu_*` + `transactions`. Signature verify, idempotency, `webhook_events`.

## 19–21. Coupons, reviews, SEO

Additive tables; admin-managed. SEO via Next.js + seo-architecture.md.

## 22. Background jobs

Inngest on Vercel (not BullMQ workers): email, order, payment, inventory, SEO, notifications.

## 23–25. Security, performance, testing

See security-architecture.md. Cursor pagination; no N+1; Map/Set for permission checks. Unit/API/BOLA/webhook/inventory tests + Semgrep in CI.

## 26–28. CI/CD, observability, deployment

Turborepo affected pipeline: lint → typecheck → test → security → build → migrate validate → deploy Vercel.  
Pino + requestId. Env secrets on Vercel only.

## 29. CommerceContext migration

API-backed products → auth → cart → wishlist → checkout → orders → PayU → admin → delete mock authority.

## 30. Rollback

Keep previous Vercel deployment; DB migrations backward-compatible (additive); feature flags for PayU/live checkout.

## 31. Risks

Schema overwrite, stock races, dual Google providers, Fastify cold starts — mitigations in plan risks table.

## 32. Definition of done

Live DB only; Google/email auth; RBAC; BOLA; PayU secure; admin operable; SEO basics; tests/CI; no hardcoded catalog authority; ACS handoff current.
