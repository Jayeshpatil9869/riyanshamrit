# SEO Architecture

## Hosting surface

`apps/web` — Next.js App Router on Vercel (SSR / ISR).  
Admin SEO fields managed in `apps/admin` after additive `seo_*` tables.

## URL design

| Page | Path |
|------|------|
| Home | `/` |
| Store | `/store` |
| Product | `/products/{slug}` |
| Category | `/categories/{slug}` |
| Content | `/blog/{slug}` (when CMS ready) |

No public ID-only URLs for catalog.

## Metadata

- Next.js `generateMetadata` from `products` / `categories` (+ `seo_metadata` when present)
- Canonical URLs, Open Graph, Twitter cards
- `robots.txt` + `sitemap.xml` (dynamic from active products/categories)
- JSON-LD: Organization, Product, BreadcrumbList; AggregateRating only when reviews exist and are valid

## Redirects

Table `redirects` (additive): from_path → to_path, status 301/410. Middleware or Next rewrite checks before 404.

## Admin control

CMS fields: title, description, og_image, robots directives, structured data overrides.  
Invalidating Redis SEO cache on publish.

## Migration note

Current Vite SPA only has static `index.html` meta. Next.js migration is the SEO foundation; do not rely on client-only meta for product pages.
