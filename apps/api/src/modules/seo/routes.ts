import { and, eq } from "drizzle-orm";
import { products, redirects, seoMetadata } from "@riyanshamrit/database";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  productJsonLd,
} from "@riyanshamrit/seo";
import { z } from "zod";
import type { AppInstance, RouteCtx } from "../../lib/http.js";
import { fail, ok, requirePermission, requireUser } from "../../lib/http.js";

export async function registerSeoRoutes(app: AppInstance, ctx: RouteCtx) {
  app.get("/api/v1/seo/sitemap", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const active = await ctx.db
      .select({ slug: products.slug, updatedAt: products.updatedAt })
      .from(products)
      .where(eq(products.isActive, true));
    const base = ctx.appUrl.replace(/\/$/, "");
    const urls = [
      { loc: `${base}/`, changefreq: "daily", priority: "1.0" },
      { loc: `${base}/store`, changefreq: "daily", priority: "0.9" },
      ...active.map((p) => ({
        loc: `${base}/products/${p.slug}`,
        lastmod: p.updatedAt?.toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      })),
    ];
    return ok({ urls }, req.id);
  });

  app.get("/api/v1/seo/robots", async (req) => {
    const base = ctx.appUrl.replace(/\/$/, "");
    return ok(
      {
        robots: `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`,
      },
      req.id,
    );
  });

  app.get<{ Params: { slug: string } }>(
    "/api/v1/seo/products/:slug",
    async (req) => {
      if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
      const [product] = await ctx.db
        .select()
        .from(products)
        .where(and(eq(products.slug, req.params.slug), eq(products.isActive, true)))
        .limit(1);
      if (!product) throw fail("NOT_FOUND", "Product not found", 404, req.id);

      const [meta] = await ctx.db
        .select()
        .from(seoMetadata)
        .where(
          and(
            eq(seoMetadata.entityType, "product"),
            eq(seoMetadata.entityId, product.id),
          ),
        )
        .limit(1);

      const jsonLd = [
        organizationJsonLd(ctx.appUrl),
        productJsonLd({
          name: product.name,
          slug: product.slug,
          description: product.description,
          imageUrl: product.imageUrl,
          price: product.price,
          baseUrl: ctx.appUrl,
        }),
        breadcrumbJsonLd([
          { name: "Home", url: ctx.appUrl },
          { name: "Store", url: `${ctx.appUrl}/store` },
          {
            name: product.name,
            url: `${ctx.appUrl}/products/${product.slug}`,
          },
        ]),
      ];

      return ok(
        {
          title: meta?.title ?? `${product.name} | Riyansh Amrit`,
          description: meta?.description ?? product.description,
          canonicalUrl:
            meta?.canonicalUrl ?? `${ctx.appUrl}/products/${product.slug}`,
          ogImage: meta?.ogImage ?? product.imageUrl,
          jsonLd,
        },
        req.id,
      );
    },
  );

  app.get("/api/v1/seo/redirects", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    const items = await ctx.db.select().from(redirects);
    return ok({ items }, req.id);
  });

  app.post("/api/v1/admin/seo/metadata", async (req) => {
    if (!ctx.db) throw fail("DB_UNAVAILABLE", "Database not configured", 503);
    requireUser(req);
    requirePermission(req.permissions, "seo.update");
    const body = z
      .object({
        entityType: z.string(),
        entityId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        canonicalUrl: z.string().url().optional(),
        ogImage: z.string().url().optional(),
        robots: z.string().optional(),
        jsonLd: z.unknown().optional(),
      })
      .parse(req.body);

    const [row] = await ctx.db
      .insert(seoMetadata)
      .values({
        entityType: body.entityType,
        entityId: body.entityId,
        title: body.title,
        description: body.description,
        canonicalUrl: body.canonicalUrl,
        ogImage: body.ogImage,
        robots: body.robots,
        jsonLd: body.jsonLd as object | undefined,
      })
      .onConflictDoUpdate({
        target: [seoMetadata.entityType, seoMetadata.entityId],
        set: {
          title: body.title,
          description: body.description,
          canonicalUrl: body.canonicalUrl,
          ogImage: body.ogImage,
          robots: body.robots,
          jsonLd: body.jsonLd as object | undefined,
          updatedAt: new Date(),
        },
      })
      .returning();
    return ok(row, req.id);
  });
}
