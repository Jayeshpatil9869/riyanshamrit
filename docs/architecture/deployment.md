# Deployment (Vercel)

## Projects

| App | Root directory | Notes |
|-----|----------------|-------|
| Storefront | `apps/web` | Next.js 15 |
| Admin | `apps/admin` | Next.js 15, noindex |
| API | `apps/api` | Fastify via `api/index.ts` + `vercel.json` |

## Required env

See root `.env.example`. Critical:

- `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` = `https://iwvrjjgjxxtlvvbdbytb.supabase.co`
- `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (API only)
- `DATABASE_URL` (pooled connection string)
- `PAYU_MERCHANT_KEY` / `PAYU_MERCHANT_SALT` / `PAYU_BASE_URL`
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
- `INNGEST_*` when enabling jobs
- `NEXT_PUBLIC_API_URL` pointing at the API deployment

## Rollback

1. Revert Vercel deployment to previous successful build.
2. DB migrations are additive — do not drop tables to roll back app versions.
3. Feature-flag PayU by omitting credentials (API returns `PAYU_UNCONFIGURED`).

## Admin bootstrap

After first login, grant RBAC:

```sql
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u CROSS JOIN roles r
WHERE u.email = 'YOUR_ADMIN@EMAIL' AND r.name IN ('admin')
ON CONFLICT DO NOTHING;
```
