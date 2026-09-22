# Security Architecture

## Trust boundaries

1. Browser → Next.js (web/admin) — public assets + user JWT/cookies  
2. Browser/Next → Fastify API — validated JWT  
3. Fastify → Supabase Postgres — service role or user-scoped  
4. PayU → webhook endpoint — HMAC/hash verification only  

## Authentication

- Supabase Auth (email/password + Google OAuth already live on `iwvrjjgjxxtlvvbdbytb`)
- Fastify verifies access JWT on protected routes
- Admin MFA required before production cutover
- Never grant admin by email string match — use RBAC tables

## Authorization

- RBAC: roles → permissions Set for O(1) checks
- Object-level (BOLA): cart, wishlist, orders, addresses always filtered by `user_id === auth.uid`
- Admin mutations write `activity_logs` (no secrets/PII dumps)

## Injection / XSS / CSRF

- Parameterized queries via Drizzle only
- Whitelist sort/filter fields
- React escaping + CSP on Next apps; sanitize any rich HTML CMS fields
- Prefer bearer JWT for API (low CSRF); if cookie sessions used: SameSite=Lax/Strict, Secure, HttpOnly + Origin checks on mutations

## Rate limiting (Upstash)

Separate buckets: public, login, signup, reset, checkout, payment, admin, webhook. Key by user id when authenticated else trusted proxy IP.

## Request limits

Body size, JSON depth, URL length, pagination max, upload size, timeouts on Fastify.

## Payments

- PayU secrets server-only
- Webhook: verify hash → timestamp window → event id → idempotency → persist `webhook_events` → process once
- Replay protection via unique event / txnid

## SSRF / uploads

- No arbitrary URL fetch from user input without allowlist
- Admin uploads: MIME + magic bytes + size + re-encode images + random object names in Supabase Storage

## Infrastructure

- TLS everywhere; Redis/Postgres not public
- Trusted proxy config for client IP
- Secrets in Vercel env only; never commit

## Scanning

CI: Semgrep, dependency audit, secret scan, typecheck. Summarize findings; do not dump full SARIF into AI context.
